// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  /////////////////////////////////////////////////////////////////////////////
  // Preferences class:

  /**
   * Preferences class manages access to Chrome profile preferences.
   * @constructor
   */
  function Preferences() {
  }

  cr.addSingletonGetter(Preferences);

  /**
   * Sets value of a boolean preference.
   * and signals its changed value.
   * @param {string} name Preference name.
   * @param {boolean} value New preference value.
   * @param {string} metric User metrics identifier.
   */
  Preferences.setBooleanPref = function(name, value, metric) {
    var argumentList = [name, Boolean(value)];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('setBooleanPref', argumentList);
  };

  /**
   * Sets value of an integer preference.
   * and signals its changed value.
   * @param {string} name Preference name.
   * @param {number} value New preference value.
   * @param {string} metric User metrics identifier.
   */
  Preferences.setIntegerPref = function(name, value, metric) {
    var argumentList = [name, Number(value)];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('setIntegerPref', argumentList);
  };

  /**
   * Sets value of a double-valued preference.
   * and signals its changed value.
   * @param {string} name Preference name.
   * @param {number} value New preference value.
   * @param {string} metric User metrics identifier.
   */
  Preferences.setDoublePref = function(name, value, metric) {
    var argumentList = [name, Number(value)];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('setDoublePref', argumentList);
  };

  /**
   * Sets value of a string preference.
   * and signals its changed value.
   * @param {string} name Preference name.
   * @param {string} value New preference value.
   * @param {string} metric User metrics identifier.
   */
  Preferences.setStringPref = function(name, value, metric) {
    var argumentList = [name, String(value)];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('setStringPref', argumentList);
  };

  /**
   * Sets value of a JSON list preference.
   * and signals its changed value.
   * @param {string} name Preference name.
   * @param {Array} value New preference value.
   * @param {string} metric User metrics identifier.
   */
  Preferences.setListPref = function(name, value, metric) {
    var argumentList = [name, JSON.stringify(value)];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('setListPref', argumentList);
  };

  /**
   * Clears value of a JSON preference.
   * @param {string} name Preference name.
   * @param {string} metric User metrics identifier.
   */
  Preferences.clearPref = function(name, metric) {
    var argumentList = [name];
    if (metric != undefined) argumentList.push(metric);
    chrome.send('clearPref', argumentList);
  };

  Preferences.prototype = {
    __proto__: cr.EventTarget.prototype,

    // Map of registered preferences.
    registeredPreferences_: {},

    /**
     * Adds an event listener to the target.
     * @param {string} type The name of the event.
     * @param {!Function|{handleEvent:Function}} handler The handler for the
     *     event. This is called when the event is dispatched.
     */
    addEventListener: function(type, handler) {
      cr.EventTarget.prototype.addEventListener.call(this, type, handler);
      this.registeredPreferences_[type] = true;
    },

    /**
     * Initializes preference reading and change notifications.
     */
    initialize: function() {
      var params1 = ['Preferences.prefsFetchedCallback'];
      var params2 = ['Preferences.prefsChangedCallback'];
      for (var prefName in this.registeredPreferences_) {
        params1.push(prefName);
        params2.push(prefName);
      }
      chrome.send('fetchPrefs', params1);
      chrome.send('observePrefs', params2);
    },

    /**
     * Helper function for flattening of dictionary passed via fetchPrefs
     * callback.
     * @param {string} prefix Preference name prefix.
     * @param {object} dict Map with preference values.
     */
    flattenMapAndDispatchEvent_: function(prefix, dict) {
      for (var prefName in dict) {
        if (typeof dict[prefName] == 'object' &&
            !this.registeredPreferences_[prefix + prefName]) {
          this.flattenMapAndDispatchEvent_(prefix + prefName + '.',
              dict[prefName]);
        } else {
          var event = new cr.Event(prefix + prefName);
          event.value = dict[prefName];
          this.dispatchEvent(event);
        }
      }
    }
  };

  /**
   * Callback for fetchPrefs method.
   * @param {object} dict Map of fetched property values.
   */
  Preferences.prefsFetchedCallback = function(dict) {
    Preferences.getInstance().flattenMapAndDispatchEvent_('', dict);
  };

  /**
   * Callback for observePrefs method.
   * @param {array} notification An array defining changed preference values.
   * notification[0] contains name of the change preference while its new value
   * is stored in notification[1].
   */
  Preferences.prefsChangedCallback = function(notification) {
    var event = new cr.Event(notification[0]);
    event.value = notification[1];
    Preferences.getInstance().dispatchEvent(event);
  };

  // Export
  return {
    Preferences: Preferences
  };

});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var Preferences = options.Preferences;
  /////////////////////////////////////////////////////////////////////////////
  // PrefCheckbox class:
  // TODO(jhawkins): Refactor all this copy-pasted code!

  // Define a constructor that uses an input element as its underlying element.
  var PrefCheckbox = cr.ui.define('input');

  PrefCheckbox.prototype = {
    // Set up the prototype chain
    __proto__: HTMLInputElement.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      this.type = 'checkbox';
      var self = this;

      self.initializeValueType(self.getAttribute('value-type'));

      // Listen to pref changes.
      Preferences.getInstance().addEventListener(
          this.pref,
          function(event) {
            var value = event.value && event.value['value'] != undefined ?
                event.value['value'] : event.value;

            // Invert pref value if inverted_pref == true.
            if (self.inverted_pref)
              self.checked = !Boolean(value);
            else
              self.checked = Boolean(value);

            self.managed = event.value && event.value['managed'] != undefined ?
                event.value['managed'] : false;

            // Managed UI elements can only be disabled as a result of being
            // managed. They cannot be enabled as a result of a pref being
            // unmanaged.
            if (self.managed)
              self.disabled = true;
          });

      // Listen to user events.
      this.addEventListener(
          'change',
          function(e) {
            var value = self.inverted_pref ? !self.checked : self.checked;
            switch(self.valueType) {
              case 'number':
                Preferences.setIntegerPref(self.pref,
                    Number(value), self.metric);
                break;
              case 'boolean':
                Preferences.setBooleanPref(self.pref,
                    value, self.metric);
                break;
            }
          });
    },

    /**
     * Sets up options in checkbox element.
     * @param {String} valueType The preference type for this checkbox.
     */
    initializeValueType: function(valueType) {
      this.valueType = valueType || 'boolean';
    }
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefCheckbox, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefCheckbox, 'metric', cr.PropertyKind.ATTR);

  /**
   * Whether to use inverted pref value.
   * @type {boolean}
   */
  cr.defineProperty(PrefCheckbox, 'inverted_pref', cr.PropertyKind.BOOL_ATTR);

  /////////////////////////////////////////////////////////////////////////////
  // PrefRadio class:

  //Define a constructor that uses an input element as its underlying element.
  var PrefRadio = cr.ui.define('input');

  PrefRadio.prototype = {
    // Set up the prototype chain
    __proto__: HTMLInputElement.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      this.type = 'radio';
      var self = this;

      // Listen to pref changes.
      Preferences.getInstance().addEventListener(this.pref,
          function(event) {
            var value = event.value && event.value['value'] != undefined ?
                event.value['value'] : event.value;
            self.managed = event.value && event.value['managed'] != undefined ?
                event.value['managed'] : false;
            self.checked = String(value) == self.value;

            // Managed UI elements can only be disabled as a result of being
            // managed. They cannot be enabled as a result of a pref being
            // unmanaged.
            if (self.managed)
              self.disabled = true;
          });

      // Listen to user events.
      this.addEventListener('change',
          function(e) {
            if(self.value == 'true' || self.value == 'false') {
              Preferences.setBooleanPref(self.pref,
                  self.value == 'true', self.metric);
            } else {
              Preferences.setIntegerPref(self.pref,
                  parseInt(self.value, 10), self.metric);
            }
          });
    },
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefRadio, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefRadio, 'metric', cr.PropertyKind.ATTR);

  /////////////////////////////////////////////////////////////////////////////
  // PrefNumeric class:

  // Define a constructor that uses an input element as its underlying element.
  var PrefNumeric = function() {};
  PrefNumeric.prototype = {
    // Set up the prototype chain
    __proto__: HTMLInputElement.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      var self = this;

      // Listen to pref changes.
      Preferences.getInstance().addEventListener(this.pref,
          function(event) {
            self.value = event.value && event.value['value'] != undefined ?
                event.value['value'] : event.value;
            self.managed = event.value && event.value['managed'] != undefined ?
                event.value['managed'] : false;

            // Managed UI elements can only be disabled as a result of being
            // managed. They cannot be enabled as a result of a pref being
            // unmanaged.
            if (self.managed)
              self.disabled = true;
          });

      // Listen to user events.
      this.addEventListener('change',
          function(e) {
            if (this.validity.valid) {
              Preferences.setIntegerPref(self.pref, self.value, self.metric);
            }
          });
    }
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefNumeric, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefNumeric, 'metric', cr.PropertyKind.ATTR);

  /////////////////////////////////////////////////////////////////////////////
  // PrefNumber class:

  // Define a constructor that uses an input element as its underlying element.
  var PrefNumber = cr.ui.define('input');

  PrefNumber.prototype = {
    // Set up the prototype chain
    __proto__: PrefNumeric.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      this.type = 'number';
      PrefNumeric.prototype.decorate.call(this);

      // Listen to user events.
      this.addEventListener('input',
          function(e) {
            if (this.validity.valid) {
              Preferences.setIntegerPref(self.pref, self.value, self.metric);
            }
          });
    }
  };

  /////////////////////////////////////////////////////////////////////////////
  // PrefRange class:

  // Define a constructor that uses an input element as its underlying element.
  var PrefRange = cr.ui.define('input');

  PrefRange.prototype = {
    // Set up the prototype chain
    __proto__: HTMLInputElement.prototype,

    /**
     * The map from input range value to the corresponding preference value.
     */
    valueMap: undefined,

    /**
     * If true, the associated pref will be modified on each onchange event;
     * otherwise, the pref will only be modified on the onmouseup event after
     * the drag.
     */
    continuous: true,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      this.type = 'range';

      // Update the UI when the pref changes.
      Preferences.getInstance().addEventListener(
          this.pref, this.onPrefChange_.bind(this));

      // Listen to user events.
      // TODO(jhawkins): Add onmousewheel handling once the associated WK bug is
      // fixed.
      // https://bugs.webkit.org/show_bug.cgi?id=52256
      this.onchange = this.onChange_.bind(this);
      this.onkeyup = this.onmouseup = this.onInputUp_.bind(this);
    },

    /**
     * Event listener that updates the UI when the underlying pref changes.
     * @param {Event} event The event that details the pref change.
     * @private
     */
    onPrefChange_: function(event) {
      var value = event.value && event.value['value'] != undefined ?
          event.value['value'] : event.value;
      if (value != undefined)
        this.value = this.valueMap ? this.valueMap.indexOf(value) : value;
    },

    /**
     * onchange handler that sets the pref when the user changes the value of
     * the input element.
     * @private
     */
    onChange_: function(event) {
      if (this.continuous)
        this.setRangePref_();

      if (this.notifyChange)
        this.notifyChange(this, this.mapValueToRange_(this.value));
    },

    /**
     * Sets the integer value of |pref| to the value of this element.
     * @private
     */
    setRangePref_: function() {
      Preferences.setIntegerPref(
          this.pref, this.mapValueToRange_(this.value), this.metric);

      if (this.notifyPrefChange)
        this.notifyPrefChange(this, this.mapValueToRange_(this.value));
    },

    /**
     * onkeyup/onmouseup handler that modifies the pref if |continuous| is
     * false.
     * @private
     */
    onInputUp_: function(event) {
      if (!this.continuous)
        this.setRangePref_();
    },

    /**
     * Maps the value of this element into the range provided by the client,
     * represented by |valueMap|.
     * @param {number} value The value to map.
     * @private
     */
    mapValueToRange_: function(value) {
      return this.valueMap ? this.valueMap[value] : value;
    },

    /**
     * Called when the client has specified non-continuous mode and the value of
     * the range control changes.
     * @param {Element} el This element.
     * @param {number} value The value of this element.
     */
    notifyChange: function(el, value) {
    },
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefRange, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefRange, 'metric', cr.PropertyKind.ATTR);

  /////////////////////////////////////////////////////////////////////////////
  // PrefSelect class:

  // Define a constructor that uses a select element as its underlying element.
  var PrefSelect = cr.ui.define('select');

  PrefSelect.prototype = {
    // Set up the prototype chain
    __proto__: HTMLSelectElement.prototype,

    /**
    * Initialization function for the cr.ui framework.
    */
    decorate: function() {
      var self = this;

      // Listen to pref changes.
      Preferences.getInstance().addEventListener(this.pref,
          function(event) {
            var value = event.value && event.value['value'] != undefined ?
                event.value['value'] : event.value;

            // Make sure |value| is a string, because the value is stored as a
            // string in the HTMLOptionElement.
            value = value.toString();

            self.managed = event.value && event.value['managed'] != undefined ?
                event.value['managed'] : false;

            // Managed UI elements can only be disabled as a result of being
            // managed. They cannot be enabled as a result of a pref being
            // unmanaged.
            if (self.managed)
              self.disabled = true;

            var found = false;
            for (var i = 0; i < self.options.length; i++) {
              if (self.options[i].value == value) {
                self.selectedIndex = i;
                found = true;
              }
            }

            // Item not found, select first item.
            if (!found)
              self.selectedIndex = 0;

            if (self.onchange != undefined)
              self.onchange(event);
          });

      // Listen to user events.
      this.addEventListener('change',
          function(e) {
            if (!self.dataType) {
              console.error('undefined data type for <select> pref');
              return;
            }

            switch(self.dataType) {
              case 'number':
                Preferences.setIntegerPref(self.pref,
                    self.options[self.selectedIndex].value, self.metric);
                break;
              case 'double':
                Preferences.setDoublePref(self.pref,
                    self.options[self.selectedIndex].value, self.metric);
                break;
              case 'boolean':
                var option = self.options[self.selectedIndex];
                var value = (option.value == 'true') ? true : false;
                Preferences.setBooleanPref(self.pref, value, self.metric);
                break;
              case 'string':
                Preferences.setStringPref(self.pref,
                    self.options[self.selectedIndex].value, self.metric);
                break;
              default:
                console.error('unknown data type for <select> pref: ' +
                              self.dataType);
            }
          });
    },
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefSelect, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefSelect, 'metric', cr.PropertyKind.ATTR);

  /**
   * The data type for the preference options.
   * @type {string}
   */
  cr.defineProperty(PrefSelect, 'dataType', cr.PropertyKind.ATTR);

  /////////////////////////////////////////////////////////////////////////////
  // PrefTextField class:

  // Define a constructor that uses an input element as its underlying element.
  var PrefTextField = cr.ui.define('input');

  PrefTextField.prototype = {
    // Set up the prototype chain
    __proto__: HTMLInputElement.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      var self = this;

      // Listen to pref changes.
      Preferences.getInstance().addEventListener(this.pref,
          function(event) {
            self.value = event.value && event.value['value'] != undefined ?
                event.value['value'] : event.value;
            self.managed = event.value && event.value['managed'] != undefined ?
                event.value['managed'] : false;

            // Managed UI elements can only be disabled as a result of being
            // managed. They cannot be enabled as a result of a pref being
            // unmanaged.
            if (self.managed)
              self.disabled = true;
          });

      // Listen to user events.
      this.addEventListener('change',
          function(e) {
            Preferences.setStringPref(self.pref, self.value, self.metric);
          });

      window.addEventListener('unload',
          function() {
            if (document.activeElement == self)
              self.blur();
          });
    }
  };

  /**
   * The preference name.
   * @type {string}
   */
  cr.defineProperty(PrefTextField, 'pref', cr.PropertyKind.ATTR);

  /**
   * The user metric string.
   * @type {string}
   */
  cr.defineProperty(PrefTextField, 'metric', cr.PropertyKind.ATTR);

  // Export
  return {
    PrefCheckbox: PrefCheckbox,
    PrefNumber: PrefNumber,
    PrefNumeric: PrefNumeric,
    PrefRadio: PrefRadio,
    PrefRange: PrefRange,
    PrefSelect: PrefSelect,
    PrefTextField: PrefTextField
  };

});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const List = cr.ui.List;
  const ListItem = cr.ui.ListItem;

  /**
   * Creates a deletable list item, which has a button that will trigger a call
   * to deleteItemAtIndex(index) in the list.
   */
  function DeletableItem(value) {
    var el = cr.doc.createElement('div');
    DeletableItem.decorate(el);
    return el;
  }

  /**
   * Decorates an element as a deletable list item.
   * @param {!HTMLElement} el The element to decorate.
   */
  DeletableItem.decorate = function(el) {
    el.__proto__ = DeletableItem.prototype;
    el.decorate();
  };

  DeletableItem.prototype = {
    __proto__: ListItem.prototype,

    /**
     * The element subclasses should populate with content.
     * @type {HTMLElement}
     * @private
     */
    contentElement_: null,

    /**
     * The close button element.
     * @type {HTMLElement}
     * @private
     */
    closeButtonElement_: null,

    /**
     * Whether or not this item can be deleted.
     * @type {boolean}
     * @private
     */
    deletable_: true,

    /** @inheritDoc */
    decorate: function() {
      ListItem.prototype.decorate.call(this);

      this.classList.add('deletable-item');

      this.contentElement_ = this.ownerDocument.createElement('div');
      this.appendChild(this.contentElement_);

      this.closeButtonElement_ = this.ownerDocument.createElement('button');
      this.closeButtonElement_.classList.add('raw-button');
      this.closeButtonElement_.classList.add('close-button');
      this.closeButtonElement_.addEventListener('mousedown',
                                                this.handleMouseDownUpOnClose_);
      this.closeButtonElement_.addEventListener('mouseup',
                                                this.handleMouseDownUpOnClose_);
      this.appendChild(this.closeButtonElement_);
    },

    /**
     * Returns the element subclasses should add content to.
     * @return {HTMLElement} The element subclasses should popuplate.
     */
    get contentElement() {
      return this.contentElement_;
    },

    /* Gets/sets the deletable property. An item that is not deletable doesn't
     * show the delete button (although space is still reserved for it).
     */
    get deletable() {
      return this.deletable_;
    },
    set deletable(value) {
      this.deletable_ = value;
      this.closeButtonElement_.disabled = !value;
    },

    /**
     * Don't let the list have a crack at the event. We don't want clicking the
     * close button to change the selection of the list.
     * @param {Event} e The mouse down/up event object.
     * @private
     */
    handleMouseDownUpOnClose_: function(e) {
      if (!e.target.disabled)
        e.stopPropagation();
    },
  };

  var DeletableItemList = cr.ui.define('list');

  DeletableItemList.prototype = {
    __proto__: List.prototype,

    /** @inheritDoc */
    decorate: function() {
      List.prototype.decorate.call(this);
      this.addEventListener('click', this.handleClick_);
      this.addEventListener('keydown', this.handleKeyDown_);
    },

    /**
     * Callback for onclick events.
     * @param {Event} e The click event object.
     * @private
     */
    handleClick_: function(e) {
      if (this.disabled)
        return;

      var target = e.target;
      if (target.classList.contains('close-button')) {
        var listItem = this.getListItemAncestor(target);
        var selected = this.selectionModel.selectedIndexes;

        // Check if the list item that contains the close button being clicked
        // is not in the list of selected items. Only delete this item in that
        // case.
        var idx = this.getIndexOfListItem(listItem);
        if (selected.indexOf(idx) == -1) {
          this.deleteItemAtIndex(idx);
        } else {
          this.deleteSelectedItems_();
        }
      }
    },

    /**
     * Callback for keydown events.
     * @param {Event} e The keydown event object.
     * @private
     */
    handleKeyDown_: function(e) {
      // Map delete (and backspace on Mac) to item deletion (unless focus is
      // in an input field, where it's intended for text editing).
      if ((e.keyCode == 46 || (e.keyCode == 8 && cr.isMac)) &&
          e.target.tagName != 'INPUT') {
        this.deleteSelectedItems_();
        // Prevent the browser from going back.
        e.preventDefault();
      }
    },

    /**
     * Deletes all the currently selected items that are deletable.
     * @private
     */
    deleteSelectedItems_: function() {
      var selected = this.selectionModel.selectedIndexes;
      // Reverse through the list of selected indexes to maintain the
      // correct index values after deletion.
      for (var j = selected.length - 1; j >= 0; j--) {
        var index = selected[j];
        if (this.getListItemByIndex(index).deletable)
          this.deleteItemAtIndex(index);
      }
    },

    /**
     * Called when an item should be deleted; subclasses are responsible for
     * implementing.
     * @param {number} index The index of the item that is being deleted.
     */
    deleteItemAtIndex: function(index) {
    },
  };

  return {
    DeletableItemList: DeletableItemList,
    DeletableItem: DeletableItem,
  };
});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const DeletableItem = options.DeletableItem;
  const DeletableItemList = options.DeletableItemList;

  /**
   * Creates a new list item with support for inline editing.
   * @constructor
   * @extends {options.DeletableListItem}
   */
  function InlineEditableItem() {
    var el = cr.doc.createElement('div');
    InlineEditableItem.decorate(el);
    return el;
  }

  /**
   * Decorates an element as a inline-editable list item. Note that this is
   * a subclass of DeletableItem.
   * @param {!HTMLElement} el The element to decorate.
   */
  InlineEditableItem.decorate = function(el) {
    el.__proto__ = InlineEditableItem.prototype;
    el.decorate();
  };

  InlineEditableItem.prototype = {
    __proto__: DeletableItem.prototype,

    /**
     * Whether or not this item can be edited.
     * @type {boolean}
     * @private
     */
    editable_: true,

    /**
     * Whether or not the current edit should be considered cancelled, rather
     * than committed, when editing ends.
     * @type {boolean}
     * @private
     */
    editCancelled_: true,

    /**
     * The editable item corresponding to the last click, if any. Used to decide
     * initial focus when entering edit mode.
     * @type {HTMLElement}
     * @private
     */
    editClickTarget_: null,

    /** @inheritDoc */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);

      this.addEventListener('mousedown', this.handleMouseDown_.bind(this));
      this.addEventListener('keydown', this.handleKeyDown_.bind(this));
      this.addEventListener('leadChange', this.handleLeadChange_);
    },

    /** @inheritDoc */
    selectionChanged: function() {
      this.updateEditState();
    },

    /**
     * Called when this element gains or loses 'lead' status. Updates editing
     * mode accordingly.
     * @private
     */
    handleLeadChange_: function() {
      this.updateEditState();
    },

    /**
     * Updates the edit state based on the current selected and lead states.
     */
    updateEditState: function() {
      if (this.editable)
        this.editing = this.selected && this.lead;
    },

    /**
     * Whether the user is currently editing the list item.
     * @type {boolean}
     */
    get editing() {
      return this.hasAttribute('editing');
    },
    set editing(editing) {
      if (this.editing == editing)
        return;

      if (editing)
        this.setAttribute('editing', '');
      else
        this.removeAttribute('editing');

      if (editing) {
        this.editCancelled_ = false;

        cr.dispatchSimpleEvent(this, 'edit', true);

        var focusElement = this.editClickTarget_ || this.initialFocusElement;
        this.editClickTarget_ = null;

        // When this is called in response to the selectedChange event,
        // the list grabs focus immediately afterwards. Thus we must delay
        // our focus grab.
        var self = this;
        if (focusElement) {
          window.setTimeout(function() {
            // Make sure we are still in edit mode by the time we execute.
            if (self.editing) {
              focusElement.focus();
              focusElement.select();
            }
          }, 50);
        }
      } else {
        if (!this.editCancelled_ && this.hasBeenEdited &&
            this.currentInputIsValid) {
          this.updateStaticValues_();
          cr.dispatchSimpleEvent(this, 'commitedit', true);
        } else {
          this.resetEditableValues_();
          cr.dispatchSimpleEvent(this, 'canceledit', true);
        }
      }
    },

    /**
     * Whether the item is editable.
     * @type {boolean}
     */
    get editable() {
      return this.editable_;
    },
    set editable(editable) {
      this.editable_ = editable;
      if (!editable)
        this.editing = false;
    },

    /**
     * The HTML element that should have focus initially when editing starts,
     * if a specific element wasn't clicked.
     * Defaults to the first <input> element; can be overriden by subclasses if
     * a different element should be focused.
     * @type {HTMLElement}
     */
    get initialFocusElement() {
      return this.contentElement.querySelector('input');
    },

    /**
     * Whether the input in currently valid to submit. If this returns false
     * when editing would be submitted, either editing will not be ended,
     * or it will be cancelled, depending on the context.
     * Can be overrided by subclasses to perform input validation.
     * @type {boolean}
     */
    get currentInputIsValid() {
      return true;
    },

    /**
     * Returns true if the item has been changed by an edit.
     * Can be overrided by subclasses to return false when nothing has changed
     * to avoid unnecessary commits.
     * @type {boolean}
     */
    get hasBeenEdited() {
      return true;
    },

    /**
     * Returns a div containing an <input>, as well as static text if
     * opt_alwaysEditable is not true.
     * @param {string} text The text of the cell.
     * @param {bool} opt_alwaysEditable True if the cell always shows the input.
     * @return {HTMLElement} The HTML element for the cell.
     * @private
     */
    createEditableTextCell: function(text, opt_alwaysEditable) {
      var container = this.ownerDocument.createElement('div');

      if (!opt_alwaysEditable) {
        var textEl = this.ownerDocument.createElement('div');
        textEl.className = 'static-text';
        textEl.textContent = text;
        textEl.setAttribute('displaymode', 'static');
        container.appendChild(textEl);
      }

      var inputEl = this.ownerDocument.createElement('input');
      inputEl.type = 'text';
      inputEl.value = text;
      if (!opt_alwaysEditable) {
        inputEl.setAttribute('displaymode', 'edit');
        inputEl.staticVersion = textEl;
      }
      container.appendChild(inputEl);

      return container;
    },

    /**
     * Resets the editable version of any controls created by createEditable*
     * to match the static text.
     * @private
     */
    resetEditableValues_: function() {
      var editFields = this.querySelectorAll('[displaymode=edit]');
      for (var i = 0; i < editFields.length; i++) {
        var staticLabel = editFields[i].staticVersion;
        if (!staticLabel)
          continue;
        if (editFields[i].tagName == 'INPUT')
          editFields[i].value = staticLabel.textContent;
        // Add more tag types here as new createEditable* methods are added.

        editFields[i].setCustomValidity('');
      }
    },

    /**
     * Sets the static version of any controls created by createEditable*
     * to match the current value of the editable version. Called on commit so
     * that there's no flicker of the old value before the model updates.
     * @private
     */
    updateStaticValues_: function() {
      var editFields = this.querySelectorAll('[displaymode=edit]');
      for (var i = 0; i < editFields.length; i++) {
        var staticLabel = editFields[i].staticVersion;
        if (!staticLabel)
          continue;
        if (editFields[i].tagName == 'INPUT')
          staticLabel.textContent = editFields[i].value;
        // Add more tag types here as new createEditable* methods are added.
      }
    },

    /**
     * Called a key is pressed. Handles committing and cancelling edits.
     * @param {Event} e The key down event.
     * @private
     */
    handleKeyDown_: function(e) {
      if (!this.editing)
        return;

      var endEdit = false;
      switch (e.keyIdentifier) {
        case 'U+001B':  // Esc
          this.editCancelled_ = true;
          endEdit = true;
          break;
        case 'Enter':
          if (this.currentInputIsValid)
            endEdit = true;
          break;
      }

      if (endEdit) {
        // Blurring will trigger the edit to end; see InlineEditableItemList.
        this.ownerDocument.activeElement.blur();
        // Make sure that handled keys aren't passed on and double-handled.
        // (e.g., esc shouldn't both cancel an edit and close a subpage)
        e.stopPropagation();
      }
    },

    /**
     * Called when the list item is clicked. If the click target corresponds to
     * an editable item, stores that item to focus when edit mode is started.
     * @param {Event} e The mouse down event.
     * @private
     */
    handleMouseDown_: function(e) {
      if (!this.editable || this.editing)
        return;

      var clickTarget = e.target;
      var editFields = this.querySelectorAll('[displaymode=edit]');
      for (var i = 0; i < editFields.length; i++) {
        if (editFields[i].staticVersion == clickTarget) {
          this.editClickTarget_ = editFields[i];
          return;
        }
      }
    },
  };

  var InlineEditableItemList = cr.ui.define('list');

  InlineEditableItemList.prototype = {
    __proto__: DeletableItemList.prototype,

    /** @inheritDoc */
    decorate: function() {
      DeletableItemList.prototype.decorate.call(this);
      this.setAttribute('inlineeditable', '');
      this.addEventListener('hasElementFocusChange',
                            this.handleListFocusChange_);
    },

    /**
     * Called when the list hierarchy as a whole loses or gains focus; starts
     * or ends editing for the lead item if necessary.
     * @param {Event} e The change event.
     * @private
     */
    handleListFocusChange_: function(e) {
      var leadItem = this.getListItemByIndex(this.selectionModel.leadIndex);
      if (leadItem) {
        if (e.newValue)
          leadItem.updateEditState();
        else
          leadItem.editing = false;
      }
    },
  };

  // Export
  return {
    InlineEditableItem: InlineEditableItem,
    InlineEditableItemList: InlineEditableItemList,
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  /////////////////////////////////////////////////////////////////////////////
  // OptionsPage class:

  /**
   * Base class for options page.
   * @constructor
   * @param {string} name Options page name, also defines id of the div element
   *     containing the options view and the name of options page navigation bar
   *     item as name+'PageNav'.
   * @param {string} title Options page title, used for navigation bar
   * @extends {EventTarget}
   */
  function OptionsPage(name, title, pageDivName) {
    this.name = name;
    this.title = title;
    this.pageDivName = pageDivName;
    this.pageDiv = $(this.pageDivName);
    this.tab = null;
    this.managed = false;
  }

  const SUBPAGE_SHEET_COUNT = 2;

  /**
   * Main level option pages.
   * @protected
   */
  OptionsPage.registeredPages = {};

  /**
   * Pages which are meant to behave like modal dialogs.
   * @protected
   */
  OptionsPage.registeredOverlayPages = {};

  /**
   * Whether or not |initialize| has been called.
   * @private
   */
  OptionsPage.initialized_ = false;

  /**
   * Gets the default page (to be shown on initial load).
   */
  OptionsPage.getDefaultPage = function() {
    return BrowserOptions.getInstance();
  };

  /**
   * Shows the default page.
   */
  OptionsPage.showDefaultPage = function() {
    this.navigateToPage(this.getDefaultPage().name);
  };

  /**
   * "Navigates" to a page, meaning that the page will be shown and the
   * appropriate entry is placed in the history.
   * @param {string} pageName Page name.
   */
  OptionsPage.navigateToPage = function(pageName) {
    this.showPageByName(pageName, true);
  };

  /**
   * Shows a registered page. This handles both top-level pages and sub-pages.
   * @param {string} pageName Page name.
   * @param {boolean} updateHistory True if we should update the history after
   *     showing the page.
   * @private
   */
  OptionsPage.showPageByName = function(pageName, updateHistory) {
    // Find the currently visible root-level page.
    var rootPage = null;
    for (var name in this.registeredPages) {
      var page = this.registeredPages[name];
      if (page.visible && !page.parentPage) {
        rootPage = page;
        break;
      }
    }

    // Find the target page.
    var targetPage = this.registeredPages[pageName];
    if (!targetPage || !targetPage.canShowPage()) {
      // If it's not a page, try it as an overlay.
      if (!targetPage && this.showOverlay_(pageName, rootPage)) {
        if (updateHistory)
          this.updateHistoryState_();
        return;
      } else {
        targetPage = this.getDefaultPage();
      }
    }

    pageName = targetPage.name;

    // Determine if the root page is 'sticky', meaning that it
    // shouldn't change when showing a sub-page.  This can happen for special
    // pages like Search.
    var isRootPageLocked =
        rootPage && rootPage.sticky && targetPage.parentPage;

    // Notify pages if they will be hidden.
    for (var name in this.registeredPages) {
      var page = this.registeredPages[name];
      if (!page.parentPage && isRootPageLocked)
        continue;
      if (page.willHidePage && name != pageName &&
          !page.isAncestorOfPage(targetPage))
        page.willHidePage();
    }

    // Update visibilities to show only the hierarchy of the target page.
    for (var name in this.registeredPages) {
      var page = this.registeredPages[name];
      if (!page.parentPage && isRootPageLocked)
        continue;
      page.visible = name == pageName ||
          (!document.documentElement.classList.contains('hide-menu') &&
           page.isAncestorOfPage(targetPage));
    }

    // Update the history and current location.
    if (updateHistory)
      this.updateHistoryState_();

    // Always update the page title.
    document.title = targetPage.title;

    // Notify pages if they were shown.
    for (var name in this.registeredPages) {
      var page = this.registeredPages[name];
      if (!page.parentPage && isRootPageLocked)
        continue;
      if (page.didShowPage && (name == pageName ||
          page.isAncestorOfPage(targetPage)))
        page.didShowPage();
    }
  };

  /**
   * Updates the visibility and stacking order of the subpage backdrop
   * according to which subpage is topmost and visible.
   * @private
   */
  OptionsPage.updateSubpageBackdrop_ = function () {
    var topmostPage = this.getTopmostVisibleNonOverlayPage_();
    var nestingLevel = topmostPage ? topmostPage.nestingLevel : 0;

    var subpageBackdrop = $('subpage-backdrop');
    if (nestingLevel > 0) {
      var container = $('subpage-sheet-container-' + nestingLevel);
      subpageBackdrop.style.zIndex =
          parseInt(window.getComputedStyle(container).zIndex) - 1;
      subpageBackdrop.hidden = false;
    } else {
      subpageBackdrop.hidden = true;
    }
  };

  /**
   * Pushes the current page onto the history stack, overriding the last page
   * if it is the generic chrome://settings/.
   * @private
   */
  OptionsPage.updateHistoryState_ = function() {
    var page = this.getTopmostVisiblePage();
    var path = location.pathname;
    if (path)
      path = path.slice(1);
    // The page is already in history (the user may have clicked the same link
    // twice). Do nothing.
    if (path == page.name)
      return;

    // If there is no path, the current location is chrome://settings/.
    // Override this with the new page.
    var historyFunction = path ? window.history.pushState :
                                 window.history.replaceState;
    historyFunction.call(window.history,
                         {pageName: page.name},
                         page.title,
                         '/' + page.name);
    // Update tab title.
    document.title = page.title;
  };

  /**
   * Shows a registered Overlay page. Does not update history.
   * @param {string} overlayName Page name.
   * @param {OptionPage} rootPage The currently visible root-level page.
   * @return {boolean} whether we showed an overlay.
   */
  OptionsPage.showOverlay_ = function(overlayName, rootPage) {
    var overlay = this.registeredOverlayPages[overlayName];
    if (!overlay || !overlay.canShowPage())
      return false;

    if ((!rootPage || !rootPage.sticky) && overlay.parentPage)
      this.showPageByName(overlay.parentPage.name, false);

    this.registeredOverlayPages[overlayName].visible = true;
    return true;
  };

  /**
   * Returns whether or not an overlay is visible.
   * @return {boolean} True if an overlay is visible.
   * @private
   */
  OptionsPage.isOverlayVisible_ = function() {
    return this.getVisibleOverlay_() != null;
  };

  /**
   * Returns the currently visible overlay, or null if no page is visible.
   * @return {OptionPage} The visible overlay.
   */
  OptionsPage.getVisibleOverlay_ = function() {
    for (var name in this.registeredOverlayPages) {
      var page = this.registeredOverlayPages[name];
      if (page.visible)
        return page;
    }
    return null;
  };

  /**
   * Closes the visible overlay. Updates the history state after closing the
   * overlay.
   */
  OptionsPage.closeOverlay = function() {
    var overlay = this.getVisibleOverlay_();
    if (!overlay)
      return;

    overlay.visible = false;
    this.updateHistoryState_();
  };

  /**
   * Hides the visible overlay. Does not affect the history state.
   * @private
   */
  OptionsPage.hideOverlay_ = function() {
    var overlay = this.getVisibleOverlay_();
    if (overlay)
      overlay.visible = false;
  };

  /**
   * Returns the topmost visible page (overlays excluded).
   * @return {OptionPage} The topmost visible page aside any overlay.
   * @private
   */
  OptionsPage.getTopmostVisibleNonOverlayPage_ = function() {
    var topPage = null;
    for (var name in this.registeredPages) {
      var page = this.registeredPages[name];
      if (page.visible &&
          (!topPage || page.nestingLevel > topPage.nestingLevel))
        topPage = page;
    }

    return topPage;
  };

  /**
   * Returns the topmost visible page, or null if no page is visible.
   * @return {OptionPage} The topmost visible page.
   */
  OptionsPage.getTopmostVisiblePage = function() {
    // Check overlays first since they're top-most if visible.
    return this.getVisibleOverlay_() || this.getTopmostVisibleNonOverlayPage_();
  };

  /**
   * Closes the topmost open subpage, if any.
   * @private
   */
  OptionsPage.closeTopSubPage_ = function() {
    var topPage = this.getTopmostVisiblePage();
    if (topPage && !topPage.isOverlay && topPage.parentPage)
      topPage.visible = false;

    this.updateHistoryState_();
  };

  /**
   * Closes all subpages below the given level.
   * @param {number} level The nesting level to close below.
   */
  OptionsPage.closeSubPagesToLevel = function(level) {
    var topPage = this.getTopmostVisiblePage();
    while (topPage && topPage.nestingLevel > level) {
      topPage.visible = false;
      topPage = topPage.parentPage;
    }

    this.updateHistoryState_();
  };

  /**
   * Updates managed banner visibility state based on the topmost page.
   */
  OptionsPage.updateManagedBannerVisibility = function() {
    var topPage = this.getTopmostVisiblePage();
    if (topPage)
      topPage.updateManagedBannerVisibility();
  };

  /**
  * Shows the tab contents for the given navigation tab.
  * @param {!Element} tab The tab that the user clicked.
  */
  OptionsPage.showTab = function(tab) {
    // Search parents until we find a tab, or the nav bar itself. This allows
    // tabs to have child nodes, e.g. labels in separately-styled spans.
    while (tab && !tab.classList.contains('subpages-nav-tabs') &&
           !tab.classList.contains('tab')) {
      tab = tab.parentNode;
    }
    if (!tab || !tab.classList.contains('tab'))
      return;

    if (this.activeNavTab != null) {
      this.activeNavTab.classList.remove('active-tab');
      $(this.activeNavTab.getAttribute('tab-contents')).classList.
          remove('active-tab-contents');
    }

    tab.classList.add('active-tab');
    $(tab.getAttribute('tab-contents')).classList.add('active-tab-contents');
    this.activeNavTab = tab;
  };

  /**
   * Registers new options page.
   * @param {OptionsPage} page Page to register.
   */
  OptionsPage.register = function(page) {
    this.registeredPages[page.name] = page;
    // Create and add new page <li> element to navbar.
    var pageNav = document.createElement('li');
    pageNav.id = page.name + 'PageNav';
    pageNav.className = 'navbar-item';
    pageNav.setAttribute('pageName', page.name);
    pageNav.textContent = page.pageDiv.querySelector('h1').textContent;
    pageNav.tabIndex = 0;
    pageNav.onclick = function(event) {
      OptionsPage.navigateToPage(this.getAttribute('pageName'));
    };
    pageNav.onkeypress = function(event) {
      // Enter or space
      if (event.keyCode == 13 || event.keyCode == 32) {
        OptionsPage.navigateToPage(this.getAttribute('pageName'));
      }
    };
    var navbar = $('navbar');
    navbar.appendChild(pageNav);
    page.tab = pageNav;
    page.initializePage();
  };

  /**
   * Find an enclosing section for an element if it exists.
   * @param {Element} element Element to search.
   * @return {OptionPage} The section element, or null.
   * @private
   */
  OptionsPage.findSectionForNode_ = function(node) {
    while (node = node.parentNode) {
      if (node.nodeName == 'SECTION')
        return node;
    }
    return null;
  };

  /**
   * Registers a new Sub-page.
   * @param {OptionsPage} subPage Sub-page to register.
   * @param {OptionsPage} parentPage Associated parent page for this page.
   * @param {Array} associatedControls Array of control elements that lead to
   *     this sub-page. The first item is typically a button in a root-level
   *     page. There may be additional buttons for nested sub-pages.
   */
  OptionsPage.registerSubPage = function(subPage,
                                         parentPage,
                                         associatedControls) {
    this.registeredPages[subPage.name] = subPage;
    subPage.parentPage = parentPage;
    if (associatedControls) {
      subPage.associatedControls = associatedControls;
      if (associatedControls.length) {
        subPage.associatedSection =
            this.findSectionForNode_(associatedControls[0]);
      }
    }
    subPage.tab = undefined;
    subPage.initializePage();
  };

  /**
   * Registers a new Overlay page.
   * @param {OptionsPage} overlay Overlay to register.
   * @param {OptionsPage} parentPage Associated parent page for this overlay.
   * @param {Array} associatedControls Array of control elements associated with
   *   this page.
   */
  OptionsPage.registerOverlay = function(overlay,
                                         parentPage,
                                         associatedControls) {
    this.registeredOverlayPages[overlay.name] = overlay;
    overlay.parentPage = parentPage;
    if (associatedControls) {
      overlay.associatedControls = associatedControls;
      if (associatedControls.length) {
        overlay.associatedSection =
            this.findSectionForNode_(associatedControls[0]);
      }
    }
    overlay.tab = undefined;
    overlay.isOverlay = true;
    overlay.initializePage();
  };

  /**
   * Callback for window.onpopstate.
   * @param {Object} data State data pushed into history.
   */
  OptionsPage.setState = function(data) {
    if (data && data.pageName) {
      // It's possible an overlay may be the last top-level page shown.
      if (this.isOverlayVisible_())
        this.hideOverlay_();

      this.showPageByName(data.pageName, false);
    }
  };

  /**
   * Freezes/unfreezes the scroll position of given level's page container.
   * @param {boolean} freeze Whether the page should be frozen.
   * @param {number} level The level to freeze/unfreeze.
   * @private
   */
  OptionsPage.setPageFrozenAtLevel_ = function(freeze, level) {
    var container = level == 0 ? $('toplevel-page-container')
                               : $('subpage-sheet-container-' + level);

    if (container.classList.contains('frozen') == freeze)
      return;

    if (freeze) {
      var scrollPosition = document.body.scrollTop;
      // Lock the width, since auto width computation may change.
      container.style.width = window.getComputedStyle(container).width;
      container.classList.add('frozen');
      container.style.top = -scrollPosition + 'px';
      this.updateFrozenElementHorizontalPosition_(container);
    } else {
      var scrollPosition = - parseInt(container.style.top, 10);
      container.classList.remove('frozen');
      container.style.top = '';
      container.style.left = '';
      container.style.right = '';
      container.style.width = '';
      // Restore the scroll position.
      if (!container.hidden)
        window.scroll(document.body.scrollLeft, scrollPosition);
    }
  };

  /**
   * Freezes/unfreezes the scroll position of visible pages based on the current
   * page stack.
   */
  OptionsPage.updatePageFreezeStates = function() {
    var topPage = OptionsPage.getTopmostVisiblePage();
    if (!topPage)
      return;
    var nestingLevel = topPage.isOverlay ? 100 : topPage.nestingLevel;
    for (var i = 0; i <= SUBPAGE_SHEET_COUNT; i++) {
      this.setPageFrozenAtLevel_(i < nestingLevel, i);
    }
  };

  /**
   * Initializes the complete options page.  This will cause all C++ handlers to
   * be invoked to do final setup.
   */
  OptionsPage.initialize = function() {
    chrome.send('coreOptionsInitialize');
    this.initialized_ = true;

    var self = this;
    // Close subpages if the user clicks on the html body. Listen in the
    // capturing phase so that we can stop the click from doing anything.
    document.body.addEventListener('click',
                                   this.bodyMouseEventHandler_.bind(this),
                                   true);
    // We also need to cancel mousedowns on non-subpage content.
    document.body.addEventListener('mousedown',
                                   this.bodyMouseEventHandler_.bind(this),
                                   true);

    // Hook up the close buttons.
    subpageCloseButtons = document.querySelectorAll('.close-subpage');
    for (var i = 0; i < subpageCloseButtons.length; i++) {
      subpageCloseButtons[i].onclick = function() {
        self.closeTopSubPage_();
      };
    };

    // Install handler for key presses.
    document.addEventListener('keydown', this.keyDownEventHandler_.bind(this));

    document.addEventListener('focus', this.manageFocusChange_.bind(this),
                              true);

    document.addEventListener('scroll', this.handleScroll_.bind(this));
    window.addEventListener('resize', this.handleResize_.bind(this));

    // Calculate and store the horizontal locations of elements that may be
    // frozen later.
    var sidebarWidth =
        parseInt(window.getComputedStyle($('mainview')).webkitPaddingStart, 10);
    $('toplevel-page-container').horizontalOffset = sidebarWidth +
        parseInt(window.getComputedStyle(
            $('mainview-content')).webkitPaddingStart, 10);
    for (var level = 1; level <= SUBPAGE_SHEET_COUNT; level++) {
      var containerId = 'subpage-sheet-container-' + level;
      $(containerId).horizontalOffset = sidebarWidth;
    }
    $('subpage-backdrop').horizontalOffset = sidebarWidth;
    // Trigger the resize handler manually to set the initial state.
    this.handleResize_(null);
  };

  /**
   * Does a bounds check for the element on the given x, y client coordinates.
   * @param {Element} e The DOM element.
   * @param {number} x The client X to check.
   * @param {number} y The client Y to check.
   * @return {boolean} True if the point falls within the element's bounds.
   * @private
   */
  OptionsPage.elementContainsPoint_ = function(e, x, y) {
    var clientRect = e.getBoundingClientRect();
    return x >= clientRect.left && x <= clientRect.right &&
        y >= clientRect.top && y <= clientRect.bottom;
  };

  /**
   * Called when focus changes; ensures that focus doesn't move outside
   * the topmost subpage/overlay.
   * @param {Event} e The focus change event.
   * @private
   */
  OptionsPage.manageFocusChange_ = function(e) {
    var focusableItemsRoot;
    var topPage = this.getTopmostVisiblePage();
    if (!topPage)
      return;

    if (topPage.isOverlay) {
      // If an overlay is visible, that defines the tab loop.
      focusableItemsRoot = topPage.pageDiv;
    } else {
      // If a subpage is visible, use its parent as the tab loop constraint.
      // (The parent is used because it contains the close button.)
      if (topPage.nestingLevel > 0)
        focusableItemsRoot = topPage.pageDiv.parentNode;
    }

    if (focusableItemsRoot && !focusableItemsRoot.contains(e.target))
      topPage.focusFirstElement();
  };

  /**
   * Called when the page is scrolled; moves elements that are position:fixed
   * but should only behave as if they are fixed for vertical scrolling.
   * @param {Event} e The scroll event.
   * @private
   */
  OptionsPage.handleScroll_ = function(e) {
    var scrollHorizontalOffset = document.body.scrollLeft;
    // position:fixed doesn't seem to work for horizontal scrolling in RTL mode,
    // so only adjust in LTR mode (where scroll values will be positive).
    if (scrollHorizontalOffset >= 0) {
      $('navbar-container').style.left = -scrollHorizontalOffset + 'px';
      var subpageBackdrop = $('subpage-backdrop');
      subpageBackdrop.style.left = subpageBackdrop.horizontalOffset -
          scrollHorizontalOffset + 'px';
      this.updateAllFrozenElementPositions_();
    }
  };

  /**
   * Updates all frozen pages to match the horizontal scroll position.
   * @private
   */
  OptionsPage.updateAllFrozenElementPositions_ = function() {
    var frozenElements = document.querySelectorAll('.frozen');
    for (var i = 0; i < frozenElements.length; i++) {
      this.updateFrozenElementHorizontalPosition_(frozenElements[i]);
    }
  };

  /**
   * Updates the given frozen element to match the horizontal scroll position.
   * @param {HTMLElement} e The frozen element to update
   * @private
   */
  OptionsPage.updateFrozenElementHorizontalPosition_ = function(e) {
    if (document.documentElement.dir == 'rtl')
      e.style.right = e.horizontalOffset + 'px';
    else
      e.style.left = e.horizontalOffset - document.body.scrollLeft + 'px';
  };

  /**
   * Called when the page is resized; adjusts the size of elements that depend
   * on the veiwport.
   * @param {Event} e The resize event.
   * @private
   */
  OptionsPage.handleResize_ = function(e) {
    // Set an explicit height equal to the viewport on all the subpage
    // containers shorter than the viewport. This is used instead of
    // min-height: 100% so that there is an explicit height for the subpages'
    // min-height: 100%.
    var viewportHeight = document.documentElement.clientHeight;
    var subpageContainers =
        document.querySelectorAll('.subpage-sheet-container');
    for (var i = 0; i < subpageContainers.length; i++) {
      if (subpageContainers[i].scrollHeight > viewportHeight)
        subpageContainers[i].style.removeProperty('height');
      else
        subpageContainers[i].style.height = viewportHeight + 'px';
    }
  };

  /**
   * A function to handle mouse events (mousedown or click) on the html body by
   * closing subpages and/or stopping event propagation.
   * @return {Event} a mousedown or click event.
   * @private
   */
  OptionsPage.bodyMouseEventHandler_ = function(event) {
    // Do nothing if a subpage isn't showing.
    var topPage = this.getTopmostVisiblePage();
    if (!topPage || topPage.isOverlay || !topPage.parentPage)
      return;

    // Don't interfere with navbar clicks.
    if ($('navbar').contains(event.target))
      return;

    // Figure out which page the click happened in.
    for (var level = topPage.nestingLevel; level >= 0; level--) {
      var clickIsWithinLevel = level == 0 ? true :
          OptionsPage.elementContainsPoint_(
              $('subpage-sheet-' + level), event.clientX, event.clientY);

      if (!clickIsWithinLevel)
        continue;

      // Event was within the topmost page; do nothing.
      if (topPage.nestingLevel == level)
        return;

      // Block propgation of both clicks and mousedowns, but only close subpages
      // on click.
      if (event.type == 'click')
        this.closeSubPagesToLevel(level);
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  };

  /**
   * A function to handle key press events.
   * @return {Event} a keydown event.
   * @private
   */
  OptionsPage.keyDownEventHandler_ = function(event) {
    // Close the top overlay or sub-page on esc.
    if (event.keyCode == 27) {  // Esc
      if (this.isOverlayVisible_())
        this.closeOverlay();
      else
        this.closeTopSubPage_();
    }
  };

  /**
   * Re-initializes the C++ handlers if necessary. This is called if the
   * handlers are torn down and recreated but the DOM may not have been (in
   * which case |initialize| won't be called again). If |initialize| hasn't been
   * called, this does nothing (since it will be later, once the DOM has
   * finished loading).
   */
  OptionsPage.reinitializeCore = function() {
    if (this.initialized_)
      chrome.send('coreOptionsInitialize');
  }

  OptionsPage.prototype = {
    __proto__: cr.EventTarget.prototype,

    /**
     * The parent page of this option page, or null for top-level pages.
     * @type {OptionsPage}
     */
    parentPage: null,

    /**
     * The section on the parent page that is associated with this page.
     * Can be null.
     * @type {Element}
     */
    associatedSection: null,

    /**
     * An array of controls that are associated with this page.  The first
     * control should be located on a top-level page.
     * @type {OptionsPage}
     */
    associatedControls: null,

    /**
     * Initializes page content.
     */
    initializePage: function() {},

    /**
     * Sets managed banner visibility state.
     */
    setManagedBannerVisibility: function(visible) {
      this.managed = visible;
      if (this.visible) {
        this.updateManagedBannerVisibility();
      }
    },

    /**
     * Updates managed banner visibility state. This function iterates over
     * all input fields of a window and if any of these is marked as managed
     * it triggers the managed banner to be visible. The banner can be enforced
     * being on through the managed flag of this class but it can not be forced
     * being off if managed items exist.
     */
    updateManagedBannerVisibility: function() {
      var bannerDiv = $('managed-prefs-banner');

      var hasManaged = this.managed;
      if (!hasManaged) {
        var inputElements = this.pageDiv.querySelectorAll('input');
        for (var i = 0, len = inputElements.length; i < len; i++) {
          if (inputElements[i].managed) {
            hasManaged = true;
            break;
          }
        }
      }
      if (hasManaged) {
        bannerDiv.hidden = false;
        var height = window.getComputedStyle($('managed-prefs-banner')).height;
        $('subpage-backdrop').style.top = height;
      } else {
        bannerDiv.hidden = true;
        $('subpage-backdrop').style.top = '0';
      }
    },

    /**
     * Gets page visibility state.
     */
    get visible() {
      var page = $(this.pageDivName);
      return page && page.ownerDocument.defaultView.getComputedStyle(
          page).display == 'block';
    },

    /**
     * Sets page visibility.
     */
    set visible(visible) {
      if ((this.visible && visible) || (!this.visible && !visible))
        return;

      this.setContainerVisibility_(visible);
      if (visible) {
        this.pageDiv.classList.remove('hidden');

        if (this.tab)
          this.tab.classList.add('navbar-item-selected');
      } else {
        this.pageDiv.classList.add('hidden');

        if (this.tab)
          this.tab.classList.remove('navbar-item-selected');
      }

      OptionsPage.updatePageFreezeStates();

      // A subpage was shown or hidden.
      if (!this.isOverlay && this.nestingLevel > 0) {
        OptionsPage.updateSubpageBackdrop_();
        if (visible) {
          // Scroll to the top of the newly-opened subpage.
          window.scroll(document.body.scrollLeft, 0)
        }
      }

      // The managed prefs banner is global, so after any visibility change
      // update it based on the topmost page, not necessarily this page
      // (e.g., if an ancestor is made visible after a child).
      OptionsPage.updateManagedBannerVisibility();

      cr.dispatchPropertyChange(this, 'visible', visible, !visible);
    },

    /**
     * Shows or hides this page's container.
     * @param {boolean} visible Whether the container should be visible or not.
     * @private
     */
    setContainerVisibility_: function(visible) {
      var container = null;
      if (this.isOverlay) {
        container = $('overlay');
      } else {
        var nestingLevel = this.nestingLevel;
        if (nestingLevel > 0)
          container = $('subpage-sheet-container-' + nestingLevel);
      }
      var isSubpage = !this.isOverlay;

      if (!container || container.hidden != visible)
        return;

      if (visible) {
        container.hidden = false;
        if (isSubpage) {
          var computedStyle = window.getComputedStyle(container);
          container.style.WebkitPaddingStart =
              parseInt(computedStyle.WebkitPaddingStart, 10) + 100 + 'px';
        }
        // Separate animating changes from the removal of display:none.
        window.setTimeout(function() {
          container.classList.remove('transparent');
          if (isSubpage)
            container.style.WebkitPaddingStart = '';
        });
      } else {
        var self = this;
        container.addEventListener('webkitTransitionEnd', function f(e) {
          if (e.propertyName != 'opacity')
            return;
          container.removeEventListener('webkitTransitionEnd', f);
          self.fadeCompleted_(container);
        });
        container.classList.add('transparent');
      }
    },

    /**
     * Called when a container opacity transition finishes.
     * @param {HTMLElement} container The container element.
     * @private
     */
    fadeCompleted_: function(container) {
      if (container.classList.contains('transparent'))
        container.hidden = true;
    },

    /**
     * Focuses the first control on the page.
     */
    focusFirstElement: function() {
      // Sets focus on the first interactive element in the page.
      var focusElement =
          this.pageDiv.querySelector('button, input, list, select');
      if (focusElement)
        focusElement.focus();
    },

    /**
     * The nesting level of this page.
     * @type {number} The nesting level of this page (0 for top-level page)
     */
    get nestingLevel() {
      var level = 0;
      var parent = this.parentPage;
      while (parent) {
        level++;
        parent = parent.parentPage;
      }
      return level;
    },

    /**
     * Whether the page is considered 'sticky', such that it will
     * remain a top-level page even if sub-pages change.
     * @type {boolean} True if this page is sticky.
     */
    get sticky() {
      return false;
    },

    /**
     * Checks whether this page is an ancestor of the given page in terms of
     * subpage nesting.
     * @param {OptionsPage} page
     * @return {boolean} True if this page is nested under |page|
     */
    isAncestorOfPage: function(page) {
      var parent = page.parentPage;
      while (parent) {
        if (parent == this)
          return true;
        parent = parent.parentPage;
      }
      return false;
    },

    /**
     * Whether it should be possible to show the page.
     * @return {boolean} True if the page should be shown
     */
    canShowPage: function() {
      return true;
    },
  };

  // Export
  return {
    OptionsPage: OptionsPage
  };
});
/* ####################### */

// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const Tree = cr.ui.Tree;
  const TreeItem = cr.ui.TreeItem;

  /**
   * Creates a new tree item for certificate data.
   * @param {Object=} data Data used to create a certificate tree item.
   * @constructor
   * @extends {TreeItem}
   */
  function CertificateTreeItem(data) {
    // TODO(mattm): other columns
    var treeItem = new TreeItem({
      label: data.name,
      data: data
    });
    treeItem.__proto__ = CertificateTreeItem.prototype;

    if (data.icon) {
      treeItem.icon = data.icon;
    }

    return treeItem;
  }

  CertificateTreeItem.prototype = {
    __proto__: TreeItem.prototype,

    /**
     * The tree path id/.
     * @type {string}
     */
    get pathId() {
      var parent = this.parentItem;
      if (parent && parent instanceof CertificateTreeItem) {
        return parent.pathId + ',' + this.data.id;
      } else {
        return this.data.id;
      }
    }
  };

  /**
   * Creates a new cookies tree.
   * @param {Object=} opt_propertyBag Optional properties.
   * @constructor
   * @extends {Tree}
   */
  var CertificatesTree = cr.ui.define('tree');

  CertificatesTree.prototype = {
    __proto__: Tree.prototype,

    /** @inheritDoc */
    decorate: function() {
      Tree.prototype.decorate.call(this);
      this.treeLookup_ = {};
    },

    /** @inheritDoc */
    addAt: function(child, index) {
      Tree.prototype.addAt.call(this, child, index);
      if (child.data && child.data.id)
        this.treeLookup_[child.data.id] = child;
    },

    /** @inheritDoc */
    remove: function(child) {
      Tree.prototype.remove.call(this, child);
      if (child.data && child.data.id)
        delete this.treeLookup_[child.data.id];
    },

    /**
     * Clears the tree.
     */
    clear: function() {
      // Remove all fields without recreating the object since other code
      // references it.
      for (var id in this.treeLookup_){
        delete this.treeLookup_[id];
      }
      this.textContent = '';
    },

    /**
     * Populate the tree.
     * @param {Array} nodesData Nodes data array.
     */
    populate: function(nodesData) {
      this.clear();

      for (var i = 0; i < nodesData.length; ++i) {
        var subnodes = nodesData[i]['subnodes'];
        delete nodesData[i]['subnodes'];

        var item = new CertificateTreeItem(nodesData[i]);
        this.addAt(item, i);

        for (var j = 0; j < subnodes.length; ++j) {
          var subitem = new CertificateTreeItem(subnodes[j]);
          item.addAt(subitem, j);
        }
        // Make tree expanded by default.
        item.expanded = true;
      }

      cr.dispatchSimpleEvent(this, 'change');
    },
  };

  return {
    CertificatesTree: CertificatesTree
  };
});

/* ####################### */
  // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  /////////////////////////////////////////////////////////////////////////////
  // CertificateManagerTab class:

  /**
   * blah
   * @param {!string} id The id of this tab.
   */
  function CertificateManagerTab(id) {
    this.tree = $(id + '-tree');

    options.CertificatesTree.decorate(this.tree);
    this.tree.addEventListener('change',
        this.handleCertificatesTreeChange_.bind(this));

    var tree = this.tree;

    this.viewButton = $(id + '-view');
    this.viewButton.onclick = function(e) {
      var selected = tree.selectedItem;
      chrome.send('viewCertificate', [selected.data.id]);
    }

    this.editButton = $(id + '-edit');
    if (this.editButton !== null) {
      if (id == 'serverCertsTab') {
        this.editButton.onclick = function(e) {
          var selected = tree.selectedItem;
          chrome.send('editServerCertificate', [selected.data.id]);
        }
      } else if (id == 'caCertsTab') {
        this.editButton.onclick = function(e) {
          var data = tree.selectedItem.data;
          CertificateEditCaTrustOverlay.show(data.id, data.name);
        }
      }
    }

    this.backupButton = $(id + '-backup');
    if (this.backupButton !== null) {
      this.backupButton.onclick = function(e) {
        var selected = tree.selectedItem;
        chrome.send('exportPersonalCertificate', [selected.data.id]);
      }
    }

    this.backupAllButton = $(id + '-backup-all');
    if (this.backupAllButton !== null) {
      this.backupAllButton.onclick = function(e) {
        chrome.send('exportAllPersonalCertificates', []);
      }
    }

    this.importButton = $(id + '-import');
    if (this.importButton !== null) {
      if (id == 'personalCertsTab') {
        this.importButton.onclick = function(e) {
          chrome.send('importPersonalCertificate', []);
        }
      } else if (id == 'serverCertsTab') {
        this.importButton.onclick = function(e) {
          chrome.send('importServerCertificate', []);
        }
      } else if (id == 'caCertsTab') {
        this.importButton.onclick = function(e) {
          chrome.send('importCaCertificate', []);
        }
      }
    }

    this.exportButton = $(id + '-export');
    if (this.exportButton !== null) {
      this.exportButton.onclick = function(e) {
        var selected = tree.selectedItem;
        chrome.send('exportCertificate', [selected.data.id]);
      }
    }

    this.deleteButton = $(id + '-delete');
    this.deleteButton.onclick = function(e) {
      var data = tree.selectedItem.data;
      AlertOverlay.show(
          localStrings.getStringF(id + 'DeleteConfirm', data.name),
          localStrings.getString(id + 'DeleteImpact'),
          localStrings.getString('ok'),
          localStrings.getString('cancel'),
          function() { chrome.send('deleteCertificate', [data.id]); });
    }
  }

  CertificateManagerTab.prototype = {

    /**
     * Update button state.
     * @private
     * @param {!Object} data The data of the selected item.
     */
    updateButtonState: function(data) {
      var isCert = !!data && data.id.substr(0, 5) == 'cert-';
      var readOnly = !!data && data.readonly;
      var hasChildren = this.tree.items.length > 0;
      this.viewButton.disabled = !isCert;
      if (this.editButton !== null)
        this.editButton.disabled = !isCert;
      if (this.backupButton !== null)
        this.backupButton.disabled = !isCert;
      if (this.backupAllButton !== null)
        this.backupAllButton.disabled = !hasChildren;
      if (this.exportButton !== null)
        this.exportButton.disabled = !isCert;
      this.deleteButton.disabled = !isCert || readOnly;
    },

    /**
     * Handles certificate tree selection change.
     * @private
     * @param {!Event} e The change event object.
     */
    handleCertificatesTreeChange_: function(e) {
      var data = null;
      if (this.tree.selectedItem) {
        data = this.tree.selectedItem.data;
      }

      this.updateButtonState(data);
    },

  }

  /////////////////////////////////////////////////////////////////////////////
  // CertificateManager class:

  /**
   * Encapsulated handling of ChromeOS accounts options page.
   * @constructor
   */
  function CertificateManager(model) {
    OptionsPage.call(this, 'certificates',
                     templateData.certificateManagerPageTabTitle,
                     'certificateManagerPage');
  }

  cr.addSingletonGetter(CertificateManager);

  CertificateManager.prototype = {
    __proto__: OptionsPage.prototype,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      this.personalTab = new CertificateManagerTab('personalCertsTab');
      this.serverTab = new CertificateManagerTab('serverCertsTab');
      this.caTab = new CertificateManagerTab('caCertsTab');
      this.otherTab = new CertificateManagerTab('otherCertsTab');

      this.addEventListener('visibleChange', this.handleVisibleChange_);
    },

    initalized_: false,

    /**
     * Handler for OptionsPage's visible property change event.
     * @private
     * @param {Event} e Property change event.
     */
    handleVisibleChange_: function(e) {
      if (!this.initalized_ && this.visible) {
        this.initalized_ = true;
        chrome.send('populateCertificateManager');
      }
    }
  };

  // CertificateManagerHandler callbacks.
  CertificateManager.onPopulateTree = function(args) {
    $(args[0]).populate(args[1]);
  };

  CertificateManager.exportPersonalAskPassword = function(args) {
    CertificateBackupOverlay.show();
  };

  CertificateManager.importPersonalAskPassword = function(args) {
    CertificateRestoreOverlay.show();
  };

  // Export
  return {
    CertificateManagerTab: CertificateManagerTab,
    CertificateManager: CertificateManager
  };

});
/* ####################### */
  // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  /**
   * CertificateRestoreOverlay class
   * Encapsulated handling of the 'enter restore password' overlay page.
   * @class
   */
  function CertificateRestoreOverlay() {
    OptionsPage.call(this, 'certificateRestore',
                     '',
                     'certificateRestoreOverlay');
  }

  cr.addSingletonGetter(CertificateRestoreOverlay);

  CertificateRestoreOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('certificateRestoreCancelButton').onclick = function(event) {
        self.cancelRestore_();
      }
      $('certificateRestoreOkButton').onclick = function(event) {
        self.finishRestore_();
      }

      self.clearInputFields_();
    },

    /**
     * Clears any uncommitted input, and dismisses the overlay.
     * @private
     */
    dismissOverlay_: function() {
      this.clearInputFields_();
      OptionsPage.closeOverlay();
    },

    /**
     * Attempt the restore operation.
     * The overlay will be left up with inputs disabled until the backend
     * finishes and dismisses it.
     * @private
     */
    finishRestore_: function() {
      chrome.send('importPersonalCertificatePasswordSelected',
                  [$('certificateRestorePassword').value]);
      $('certificateRestoreCancelButton').disabled = true;
      $('certificateRestoreOkButton').disabled = true;
    },

    /**
     * Cancel the restore operation.
     * @private
     */
    cancelRestore_: function() {
      chrome.send('cancelImportExportCertificate');
      this.dismissOverlay_();
    },

    /**
     * Clears the value of each input field.
     * @private
     */
    clearInputFields_: function() {
      $('certificateRestorePassword').value = '';
      $('certificateRestoreCancelButton').disabled = false;
      $('certificateRestoreOkButton').disabled = false;
    },
  };

  CertificateRestoreOverlay.show = function() {
    CertificateRestoreOverlay.getInstance().clearInputFields_();
    OptionsPage.navigateToPage('certificateRestore');
  };

  CertificateRestoreOverlay.dismiss = function() {
    CertificateRestoreOverlay.getInstance().dismissOverlay_();
  };

  // Export
  return {
    CertificateRestoreOverlay: CertificateRestoreOverlay
  };

});
/* ####################### */
  // Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  /**
   * CertificateBackupOverlay class
   * Encapsulated handling of the 'enter backup password' overlay page.
   * @class
   */
  function CertificateBackupOverlay() {
    OptionsPage.call(this, 'certificateBackupOverlay',
                     '',
                     'certificateBackupOverlay');
  }

  cr.addSingletonGetter(CertificateBackupOverlay);

  CertificateBackupOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('certificateBackupCancelButton').onclick = function(event) {
        self.cancelBackup_();
      }
      $('certificateBackupOkButton').onclick = function(event) {
        self.finishBackup_();
      }
      $('certificateBackupPassword').oninput =
      $('certificateBackupPassword2').oninput = function(event) {
        self.comparePasswords_();
      }

      self.clearInputFields_();
    },

    /**
     * Clears any uncommitted input, and dismisses the overlay.
     * @private
     */
    dismissOverlay_: function() {
      this.clearInputFields_();
      OptionsPage.closeOverlay();
    },

    /**
     * Attempt the Backup operation.
     * The overlay will be left up with inputs disabled until the backend
     * finishes and dismisses it.
     * @private
     */
    finishBackup_: function() {
      chrome.send('exportPersonalCertificatePasswordSelected',
                  [$('certificateBackupPassword').value]);
      $('certificateBackupCancelButton').disabled = true;
      $('certificateBackupOkButton').disabled = true;
      $('certificateBackupPassword').disabled = true;
      $('certificateBackupPassword2').disabled = true;
    },

    /**
     * Cancel the Backup operation.
     * @private
     */
    cancelBackup_: function() {
      chrome.send('cancelImportExportCertificate');
      this.dismissOverlay_();
    },

    /**
     * Compares the password fields and sets the button state appropriately.
     * @private
     */
    comparePasswords_: function() {
      var password1 = $('certificateBackupPassword').value;
      var password2 = $('certificateBackupPassword2').value;
      $('certificateBackupOkButton').disabled =
          !password1 || password1 != password2;
    },

    /**
     * Clears the value of each input field.
     * @private
     */
    clearInputFields_: function() {
      $('certificateBackupPassword').value = '';
      $('certificateBackupPassword2').value = '';
      $('certificateBackupPassword').disabled = false;
      $('certificateBackupPassword2').disabled = false;
      $('certificateBackupCancelButton').disabled = false;
      $('certificateBackupOkButton').disabled = true;
    },
  };

  CertificateBackupOverlay.show = function() {
    CertificateBackupOverlay.getInstance().clearInputFields_();
    OptionsPage.navigateToPage('certificateBackupOverlay');
  };

  CertificateBackupOverlay.dismiss = function() {
    CertificateBackupOverlay.getInstance().dismissOverlay_();
  };

  // Export
  return {
    CertificateBackupOverlay: CertificateBackupOverlay
  };
});
/* ####################### */
  // Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  /**
   * CertificateEditCaTrustOverlay class
   * Encapsulated handling of the 'edit ca trust' and 'import ca' overlay pages.
   * @class
   */
  function CertificateEditCaTrustOverlay() {
    OptionsPage.call(this, 'certificateEditCaTrustOverlay',
                     '',
                     'certificateEditCaTrustOverlay');
  }

  cr.addSingletonGetter(CertificateEditCaTrustOverlay);

  CertificateEditCaTrustOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Dismisses the overlay.
     * @private
     */
    dismissOverlay_: function() {
      OptionsPage.closeOverlay();
    },

    /**
     * Enables or disables input fields.
     * @private
     */
    enableInputs_: function(enabled) {
      $('certificateCaTrustSSLCheckbox').disabled =
      $('certificateCaTrustEmailCheckbox').disabled =
      $('certificateCaTrustObjSignCheckbox').disabled =
      $('certificateEditCaTrustCancelButton').disabled =
      $('certificateEditCaTrustOkButton').disabled = !enabled;
    },

    /**
     * Attempt the Edit operation.
     * The overlay will be left up with inputs disabled until the backend
     * finishes and dismisses it.
     * @private
     */
    finishEdit_: function() {
      // TODO(mattm): Send checked values as booleans.  For now send them as
      // strings, since WebUIBindings::send does not support any other types :(
      chrome.send('editCaCertificateTrust',
                  [this.certId,
                   $('certificateCaTrustSSLCheckbox').checked.toString(),
                   $('certificateCaTrustEmailCheckbox').checked.toString(),
                   $('certificateCaTrustObjSignCheckbox').checked.toString()]);
      this.enableInputs_(false);
    },

    /**
     * Cancel the Edit operation.
     * @private
     */
    cancelEdit_: function() {
      this.dismissOverlay_();
    },

    /**
     * Attempt the Import operation.
     * The overlay will be left up with inputs disabled until the backend
     * finishes and dismisses it.
     * @private
     */
    finishImport_: function() {
      // TODO(mattm): Send checked values as booleans.  For now send them as
      // strings, since WebUIBindings::send does not support any other types :(
      chrome.send('importCaCertificateTrustSelected',
                  [$('certificateCaTrustSSLCheckbox').checked.toString(),
                   $('certificateCaTrustEmailCheckbox').checked.toString(),
                   $('certificateCaTrustObjSignCheckbox').checked.toString()]);
      this.enableInputs_(false);
    },

    /**
     * Cancel the Import operation.
     * @private
     */
    cancelImport_: function() {
      chrome.send('cancelImportExportCertificate');
      this.dismissOverlay_();
    },
  };

  /**
   * Callback from CertificateManagerHandler with the trust values.
   * @param {boolean} trustSSL The initial value of SSL trust checkbox.
   * @param {boolean} trustEmail The initial value of Email trust checkbox.
   * @param {boolean} trustObjSign The initial value of Object Signing trust
   */
  CertificateEditCaTrustOverlay.populateTrust = function(
      trustSSL, trustEmail, trustObjSign) {
    $('certificateCaTrustSSLCheckbox').checked = trustSSL;
    $('certificateCaTrustEmailCheckbox').checked = trustEmail;
    $('certificateCaTrustObjSignCheckbox').checked = trustObjSign;
    CertificateEditCaTrustOverlay.getInstance().enableInputs_(true);
  }

  /**
   * Show the Edit CA Trust overlay.
   * @param {string} certId The id of the certificate to be passed to the
   * certificate manager model.
   * @param {string} certName The display name of the certificate.
   * checkbox.
   */
  CertificateEditCaTrustOverlay.show = function(certId, certName) {
    var self = CertificateEditCaTrustOverlay.getInstance();
    self.certId = certId;
    $('certificateEditCaTrustCancelButton').onclick = function(event) {
      self.cancelEdit_();
    }
    $('certificateEditCaTrustOkButton').onclick = function(event) {
      self.finishEdit_();
    }
    $('certificateEditCaTrustDescription').textContent =
        localStrings.getStringF('certificateEditCaTrustDescriptionFormat',
                                certName);
    self.enableInputs_(false);
    OptionsPage.navigateToPage('certificateEditCaTrustOverlay');
    chrome.send('getCaCertificateTrust', [certId]);
  }

  /**
   * Show the Import CA overlay.
   * @param {string} certId The id of the certificate to be passed to the
   * certificate manager model.
   * @param {string} certName The display name of the certificate.
   * checkbox.
   */
  CertificateEditCaTrustOverlay.showImport = function(certName) {
    var self = CertificateEditCaTrustOverlay.getInstance();
    // TODO(mattm): do we want a view certificate button here like firefox has?
    $('certificateEditCaTrustCancelButton').onclick = function(event) {
      self.cancelImport_();
    }
    $('certificateEditCaTrustOkButton').onclick = function(event) {
      self.finishImport_();
    }
    $('certificateEditCaTrustDescription').textContent =
        localStrings.getStringF('certificateImportCaDescriptionFormat',
                                certName);
    CertificateEditCaTrustOverlay.populateTrust(false, false, false);
    OptionsPage.navigateToPage('certificateEditCaTrustOverlay');
  }

  CertificateEditCaTrustOverlay.dismiss = function() {
    CertificateEditCaTrustOverlay.getInstance().dismissOverlay_();
  };

  // Export
  return {
    CertificateEditCaTrustOverlay: CertificateEditCaTrustOverlay
  };
});
/* ####################### */
  // Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  /**
   * CertificateImportErrorOverlay class
   * Displays a list of certificates and errors.
   * @class
   */
  function CertificateImportErrorOverlay() {
    OptionsPage.call(this, 'certificateImportErrorOverlay', '',
                     'certificateImportErrorOverlay');
  }

  cr.addSingletonGetter(CertificateImportErrorOverlay);

  CertificateImportErrorOverlay.prototype = {
    // Inherit CertificateImportErrorOverlay from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      $('certificateImportErrorOverlayOk').onclick = function(event) {
        OptionsPage.closeOverlay();
      };
    },
  };

  /**
   * Show an alert overlay with the given message, button titles, and
   * callbacks.
   * @param {string} title The alert title to display to the user.
   * @param {string} message The alert message to display to the user.
   * @param {Array} certErrors The list of cert errors.  Each error should have
   *                           a .name and .error attribute.
   */
  CertificateImportErrorOverlay.show = function(title, message, certErrors) {
    $('certificateImportErrorOverlayTitle').textContent = title;
    $('certificateImportErrorOverlayMessage').textContent = message;

    ul = $('certificateImportErrorOverlayCertErrors');
    ul.innerHTML = '';
    for (var i = 0; i < certErrors.length; ++i) {
      li = document.createElement("li");
      li.textContent = localStrings.getStringF('certificateImportErrorFormat',
                                               certErrors[i].name,
                                               certErrors[i].error);
      ul.appendChild(li);
    }

    OptionsPage.navigateToPage('certificateImportErrorOverlay');
  }

  // Export
  return {
    CertificateImportErrorOverlay: CertificateImportErrorOverlay
  };

});
/* ####################### */
  
    var CertificateManager = options.CertificateManager;
    var CertificateRestoreOverlay = options.CertificateRestoreOverlay;
    var CertificateBackupOverlay = options.CertificateBackupOverlay;
    var CertificateEditCaTrustOverlay = options.CertificateEditCaTrustOverlay;
    var CertificateImportErrorOverlay = options.CertificateImportErrorOverlay;
  /* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const ArrayDataModel = cr.ui.ArrayDataModel;
  const ListSingleSelectionModel = cr.ui.ListSingleSelectionModel;

  /**
   * AddStartupPageOverlay class
   * Encapsulated handling of the 'Add Page' overlay page.
   * @class
   */
  function AddStartupPageOverlay() {
    OptionsPage.call(this, 'addStartupPage',
                     templateData.addStartupPageTabTitle,
                     'addStartupPageOverlay');
  }

  cr.addSingletonGetter(AddStartupPageOverlay);

  AddStartupPageOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      var addForm = $('addStartupPageForm');
      addForm.onreset = this.dismissOverlay_.bind(this);
      addForm.onsubmit =  function(e) {
        var urlField = $('addStartupPageURL');
        BrowserOptions.addStartupPage(urlField.value);

        self.dismissOverlay_();
        return false;
      };
      $('addStartupPageURL').oninput = this.updateAddButtonState_.bind(this);
      $('addStartupPageURL').onkeydown = function(e) {
        if (e.keyCode == 27)  // Esc
          $('addStartupPageForm').reset();
      };

      var list = $('addStartupRecentPageList');
      options.add_startup_page.RecentPageList.decorate(list);
      var selectionModel = new ListSingleSelectionModel;
      list.selectionModel = selectionModel;

      selectionModel.addEventListener('change',
                                      this.selectionChanged_.bind(this));

      this.addEventListener('visibleChange', function(event) {
          $('addStartupPageURL').focus();
          $('addStartupRecentPageList').redraw();
      });
    },

    /**
     * Clears any uncommited input, and dismisses the overlay.
     * @private
     */
    dismissOverlay_: function() {
      $('addStartupPageURL').value = '';
      $('addStartupRecentPageList').selectionModel.unselectAll();
      this.updateAddButtonState_();
      OptionsPage.closeOverlay();
    },

    /**
     * Sets the enabled state of the startup page Add button based on
     * the current value of the text field.
     * @private
     */
    updateAddButtonState_: function() {
      $('addStartupPageAddButton').disabled =
          $('addStartupPageURL').value == '';
    },

    /**
      * Updates the recent pages list list with the given entries.
      * @private
      * @param {Array} pages List of recent pages.
      */
    updateRecentPageList_: function(pages) {
      $('addStartupRecentPageList').dataModel = new ArrayDataModel(pages);
    },

    /**
     * Handles selection changes in the list so that we can populate the input
     * field.
     * @private
     * @param {!cr.Event} e Event with change info.
     */
    selectionChanged_: function(e) {
      var selectedIndex =
          $('addStartupRecentPageList').selectionModel.selectedIndex;
      if (selectedIndex != -1)
        chrome.send('updateAddStartupFieldWithPage', [String(selectedIndex)]);
    },

    /**
      * Sets the value of the input field to the given string.
      * @private
      * @param {string} url String value to set the input field to.
      */
    setInputFieldValue_: function(url) {
      $('addStartupPageURL').value = url;
      this.updateAddButtonState_();
    },

    /** @inheritDoc */
    canShowPage: function() {
      return BrowserOptions.getInstance().
          shouldEnableCustomStartupPageControls();
    },
  };

  AddStartupPageOverlay.updateRecentPageList = function(pages) {
    AddStartupPageOverlay.getInstance().updateRecentPageList_(pages);
  };

  AddStartupPageOverlay.setInputFieldValue = function(url) {
    AddStartupPageOverlay.getInstance().setInputFieldValue_(url);
  };

  // Export
  return {
    AddStartupPageOverlay: AddStartupPageOverlay
  };

});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.add_startup_page', function() {
  const List = cr.ui.List;
  const ListItem = cr.ui.ListItem;

  /**
   * Creates a new recent page list item.
   * @param {Object} pageInfo The page this item represents.
   * @constructor
   * @extends {cr.ui.ListItem}
   */
  function RecentPageListItem(pageInfo) {
    var el = cr.doc.createElement('div');
    el.pageInfo = pageInfo;
    RecentPageListItem.decorate(el);
    return el;
  }

  /**
   * Decorates an element as a recent page list item.
   * @param {!HTMLElement} el The element to decorate.
   */
  RecentPageListItem.decorate = function(el) {
    el.__proto__ = RecentPageListItem.prototype;
    el.decorate();
  };

  RecentPageListItem.prototype = {
    __proto__: ListItem.prototype,

    /** @inheritDoc */
    decorate: function() {
      ListItem.prototype.decorate.call(this);

      var wrapperEl = this.ownerDocument.createElement('div');
      wrapperEl.className = 'vertical-center';
      this.appendChild(wrapperEl);

      var titleEl = this.ownerDocument.createElement('span');
      titleEl.className = 'title';
      titleEl.classList.add('favicon-cell');
      titleEl.style.backgroundImage = url('chrome://favicon/' +
                                          this.pageInfo['url']);
      wrapperEl.appendChild(titleEl);
      if (this.pageInfo['title'].length > 0) {
        titleEl.textContent = this.pageInfo['title'];

        var urlEL = this.ownerDocument.createElement('span');
        urlEL.className = 'url';
        urlEL.textContent = this.pageInfo['displayURL'];
        wrapperEl.appendChild(urlEL);
      } else {
        titleEl.textContent = this.pageInfo['displayURL'];
      }
    },
  };

  var RecentPageList = cr.ui.define('list');

  RecentPageList.prototype = {
    __proto__: List.prototype,

    /** @inheritDoc */
    createItem: function(pageInfo) {
      return new RecentPageListItem(pageInfo);
    },
  };

  return {
    RecentPageList: RecentPageList
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

var OptionsPage = options.OptionsPage;

  //
  // AdvancedOptions class
  // Encapsulated handling of advanced options page.
  //
  function AdvancedOptions() {
    OptionsPage.call(this, 'advanced', templateData.advancedPageTabTitle,
                     'advancedPage');
  }

  cr.addSingletonGetter(AdvancedOptions);

  AdvancedOptions.prototype = {
    // Inherit AdvancedOptions from OptionsPage.
    __proto__: options.OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      // Call base class implementation to starts preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      // Set up click handlers for buttons.
      $('privacyContentSettingsButton').onclick = function(event) {
        OptionsPage.navigateToPage('content');
        OptionsPage.showTab($('cookies-nav-tab'));
        chrome.send('coreOptionsUserMetricsAction',
            ['Options_ContentSettings']);
      };
      $('privacyClearDataButton').onclick = function(event) {
        OptionsPage.navigateToPage('clearBrowserData');
        chrome.send('coreOptionsUserMetricsAction', ['Options_ClearData']);
      };

      // 'metricsReportingEnabled' element is only present on Chrome branded
      // builds.
      if ($('metricsReportingEnabled')) {
        $('metricsReportingEnabled').onclick = function(event) {
          chrome.send('metricsReportingCheckboxAction',
              [String(event.target.checked)]);
        };
      }

      if (!cr.isChromeOS) {
        $('autoOpenFileTypesResetToDefault').onclick = function(event) {
          chrome.send('autoOpenFileTypesAction');
        };
      }

      $('fontSettingsCustomizeFontsButton').onclick = function(event) {
        OptionsPage.navigateToPage('fonts');
        chrome.send('coreOptionsUserMetricsAction', ['Options_FontSettings']);
      };
      $('defaultFontSize').onchange = function(event) {
        chrome.send('defaultFontSizeAction',
            [String(event.target.options[event.target.selectedIndex].value)]);
      };
      $('language-button').onclick = function(event) {
        OptionsPage.navigateToPage('languages');
        chrome.send('coreOptionsUserMetricsAction',
            ['Options_LanuageAndSpellCheckSettings']);
      };

      if (cr.isWindows || cr.isMac) {
        $('certificatesManageButton').onclick = function(event) {
          chrome.send('showManageSSLCertificates');
        };
      } else {
        $('certificatesManageButton').onclick = function(event) {
          OptionsPage.navigateToPage('certificates');
          OptionsPage.showTab($('personal-certs-nav-tab'));
          chrome.send('coreOptionsUserMetricsAction',
                      ['Options_ManageSSLCertificates']);
        };
      }

      if (!cr.isChromeOS) {
        $('proxiesConfigureButton').onclick = function(event) {
          chrome.send('showNetworkProxySettings');
        };
        $('downloadLocationChangeButton').onclick = function(event) {
          chrome.send('selectDownloadLocation');
        };
        $('promptForDownload').onclick = function(event) {
          chrome.send('promptForDownloadAction',
              [String($('promptForDownload').checked)]);
        };

        // Remove Windows-style accelerators from the Browse button label.
        // TODO(csilv): Remove this after the accelerator has been removed from
        // the localized strings file, pending removal of old options window.
        $('downloadLocationChangeButton').textContent =
            localStrings.getStringWithoutAccelerator(
                'downloadLocationChangeButton');
      } else {
        $('proxiesConfigureButton').onclick = function(event) {
          OptionsPage.navigateToPage('proxy');
          chrome.send('coreOptionsUserMetricsAction',
              ['Options_ShowProxySettings']);
        };
      }

      if (cr.isWindows) {
        $('sslCheckRevocation').onclick = function(event) {
          chrome.send('checkRevocationCheckboxAction',
              [String($('sslCheckRevocation').checked)]);
        };
        $('sslUseSSL3').onclick = function(event) {
          chrome.send('useSSL3CheckboxAction',
              [String($('sslUseSSL3').checked)]);
        };
        $('sslUseTLS1').onclick = function(event) {
          chrome.send('useTLS1CheckboxAction',
              [String($('sslUseTLS1').checked)]);
        };
        $('gearSettingsConfigureGearsButton').onclick = function(event) {
          chrome.send('showGearsSettings');
        };
      }

      // 'cloudPrintProxyEnabled' is true for Chrome branded builds on
      // certain platforms, or could be enabled by a lab.
      if (!cr.isChromeOS) {
        $('cloudPrintProxySetupButton').onclick = function(event) {
          if ($('cloudPrintProxyManageButton').style.display == 'none') {
            // Disable the button, set it's text to the intermediate state.
            $('cloudPrintProxySetupButton').textContent =
              localStrings.getString('cloudPrintProxyEnablingButton');
            $('cloudPrintProxySetupButton').disabled = true;
            chrome.send('showCloudPrintSetupDialog');
          } else {
            chrome.send('disableCloudPrintProxy');
          }
        };
        $('cloudPrintProxyManageButton').onclick = function(event) {
          chrome.send('showCloudPrintManagePage');
        };
      }

      if ($('remotingSetupButton')) {
          $('remotingSetupButton').onclick = function(event) {
              chrome.send('showRemotingSetupDialog');
          }
          $('remotingStopButton').onclick = function(event) {
              chrome.send('disableRemoting');
          }
      }
  }
  };

  //
  // Chrome callbacks
  //

  // Set the checked state of the metrics reporting checkbox.
  AdvancedOptions.SetMetricsReportingCheckboxState = function(
      checked, disabled) {
    $('metricsReportingEnabled').checked = checked;
    $('metricsReportingEnabled').disabled = disabled;
    if (disabled)
      $('metricsReportingEnabledText').className = 'disable-services-span';
  }

  AdvancedOptions.SetMetricsReportingSettingVisibility = function(visible) {
    if (visible) {
      $('metricsReportingSetting').style.display = 'block';
    } else {
      $('metricsReportingSetting').style.display = 'none';
    }
  }

  // Set the font size selected item.
  AdvancedOptions.SetFontSize = function(fixed_font_size_value,
      font_size_value) {
    var selectCtl = $('defaultFontSize');
    if (fixed_font_size_value == font_size_value) {
      for (var i = 0; i < selectCtl.options.length; i++) {
        if (selectCtl.options[i].value == font_size_value) {
          selectCtl.selectedIndex = i;
          if ($('Custom'))
            selectCtl.remove($('Custom').index);
          return;
        }
      }
    }

    // Add/Select Custom Option in the font size label list.
    if (!$('Custom')) {
      var option = new Option(localStrings.getString('fontSizeLabelCustom'),
                              -1, false, true);
      option.setAttribute("id", "Custom");
      selectCtl.add(option);
    }
    $('Custom').selected = true;
  };

  // Set the download path.
  AdvancedOptions.SetDownloadLocationPath = function(path, disabled) {
    if (!cr.isChromeOS)
      $('downloadLocationPath').value = path;
      $('downloadLocationChangeButton').disabled = disabled;
  };

  // Set the prompt for download checkbox.
  AdvancedOptions.SetPromptForDownload = function(checked, disabled) {
    $('promptForDownload').checked = checked;
    $('promptForDownload').disabled = disabled;
    if (disabled)
      $('promptForDownloadLabel').className = 'informational-text';
    else
      $('promptForDownloadLabel').className = '';
  };

  // Set the enabled state for the autoOpenFileTypesResetToDefault button.
  AdvancedOptions.SetAutoOpenFileTypesDisabledAttribute = function(disabled) {
    if (!cr.isChromeOS) {
      $('autoOpenFileTypesResetToDefault').disabled = disabled;

      if (disabled)
        $('auto-open-file-types-label').classList.add('disabled');
      else
        $('auto-open-file-types-label').classList.remove('disabled');
    }
  };

  // Set the enabled state for the proxy settings button.
  AdvancedOptions.SetupProxySettingsSection = function(disabled, label) {
    $('proxiesConfigureButton').disabled = disabled;
    $('proxiesLabel').textContent = label;
  };

  // Set the checked state for the sslCheckRevocation checkbox.
  AdvancedOptions.SetCheckRevocationCheckboxState = function(
      checked, disabled) {
    $('sslCheckRevocation').checked = checked;
    $('sslCheckRevocation').disabled = disabled;
  };

  // Set the checked state for the sslUseSSL3 checkbox.
  AdvancedOptions.SetUseSSL3CheckboxState = function(checked, disabled) {
    $('sslUseSSL3').checked = checked;
    $('sslUseSSL3').disabled = disabled;
  };

  // Set the checked state for the sslUseTLS1 checkbox.
  AdvancedOptions.SetUseTLS1CheckboxState = function(checked, disabled) {
    $('sslUseTLS1').checked = checked;
    $('sslUseTLS1').disabled = disabled;
  };

  // Set the Cloud Print proxy UI to enabled, disabled, or processing.
  AdvancedOptions.SetupCloudPrintProxySection = function(
        disabled, label, allowed) {
    if (!cr.isChromeOS) {
      $('cloudPrintProxyLabel').textContent = label;
      if (disabled || !allowed) {
        $('cloudPrintProxySetupButton').textContent =
          localStrings.getString('cloudPrintProxyDisabledButton');
        $('cloudPrintProxyManageButton').style.display = 'none';
      } else {
        $('cloudPrintProxySetupButton').textContent =
          localStrings.getString('cloudPrintProxyEnabledButton');
        $('cloudPrintProxyManageButton').style.display = 'inline';
      }
      $('cloudPrintProxySetupButton').disabled = !allowed;
    }
  };

  AdvancedOptions.RemoveCloudPrintProxySection = function() {
    if (!cr.isChromeOS) {
      var proxySectionElm = $('cloud-print-proxy-section');
      if (proxySectionElm)
        proxySectionElm.parentNode.removeChild(proxySectionElm);
    }
  };

  AdvancedOptions.SetRemotingStatus = function(enabled, status) {
    if (enabled) {
      $('remotingSetupButton').style.display = 'none';
      $('remotingStopButton').style.display = 'inline';
    } else {
      $('remotingSetupButton').style.display = 'inline';
      $('remotingStopButton').style.display = 'none';
    }
    $('remotingStatus').textContent = status;
  };

  AdvancedOptions.RemoveRemotingSection = function() {
    var proxySectionElm = $('remoting-section');
    if (proxySectionElm)
      proxySectionElm.parentNode.removeChild(proxySectionElm);
  };

  // Export
  return {
    AdvancedOptions: AdvancedOptions
  };

});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  var OptionsPage = options.OptionsPage;

  /**
   * AlertOverlay class
   * Encapsulated handling of a generic alert.
   * @class
   */
  function AlertOverlay() {
    OptionsPage.call(this, 'alertOverlay', '', 'alertOverlay');
  }

  cr.addSingletonGetter(AlertOverlay);

  AlertOverlay.prototype = {
    // Inherit AlertOverlay from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Whether the page can be shown. Used to make sure the page is only
     * shown via AlertOverlay.Show(), and not via the address bar.
     * @private
     */
    canShow_: false,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('alertOverlayOk').onclick = function(event) {
        self.handleOK_();
      };

      $('alertOverlayCancel').onclick = function(event) {
        self.handleCancel_();
      };
    },

    /**
     * Handle the 'ok' button.  Clear the overlay and call the ok callback if
     * available.
     * @private
     */
    handleOK_: function() {
      OptionsPage.closeOverlay();
      if (this.okCallback != undefined) {
        this.okCallback.call();
      }
    },

    /**
     * Handle the 'cancel' button.  Clear the overlay and call the cancel
     * callback if available.
     * @private
     */
    handleCancel_: function() {
      OptionsPage.closeOverlay();
      if (this.cancelCallback != undefined) {
        this.cancelCallback.call();
      }
    },

    /**
     * The page is getting hidden. Don't let it be shown again.
     */
    willHidePage: function() {
      canShow_ = false;
    },

    /** @inheritDoc */
    canShowPage: function() {
      return this.canShow_;
    },
  };

  /**
   * Show an alert overlay with the given message, button titles, and
   * callbacks.
   * @param {string} title The alert title to display to the user.
   * @param {string} message The alert message to display to the user.
   * @param {string} okTitle The title of the OK button. If undefined or empty,
   *     no button is shown.
   * @param {string} cancelTitle The title of the cancel button. If undefined or
   *     empty, no button is shown.
   * @param {function} okCallback A function to be called when the user presses
   *     the ok button.  The alert window will be closed automatically.  Can be
   *     undefined.
   * @param {function} cancelCallback A function to be called when the user
   *     presses the cancel button.  The alert window will be closed
   *     automatically.  Can be undefined.
   */
  AlertOverlay.show = function(
      title, message, okTitle, cancelTitle, okCallback, cancelCallback) {
    if (title != undefined) {
      $('alertOverlayTitle').textContent = title;
      $('alertOverlayTitle').style.display = 'block';
    } else {
      $('alertOverlayTitle').style.display = 'none';
    }

    if (message != undefined) {
      $('alertOverlayMessage').textContent = message;
      $('alertOverlayMessage').style.display = 'block';
    } else {
      $('alertOverlayMessage').style.display = 'none';
    }

    if (okTitle != undefined && okTitle != '') {
      $('alertOverlayOk').textContent = okTitle;
      $('alertOverlayOk').style.display = 'block';
    } else {
      $('alertOverlayOk').style.display = 'none';
    }

    if (cancelTitle != undefined && cancelTitle != '') {
      $('alertOverlayCancel').textContent = cancelTitle;
      $('alertOverlayCancel').style.display = 'inline';
    } else {
      $('alertOverlayCancel').style.display = 'none';
    }

    var alertOverlay = AlertOverlay.getInstance();
    alertOverlay.okCallback = okCallback;
    alertOverlay.cancelCallback = cancelCallback;
    alertOverlay.canShow_ = true;

    // Intentionally don't show the URL in the location bar as we don't want
    // people trying to navigate here by hand.
    OptionsPage.showPageByName('alertOverlay', false);
  }

  // Export
  return {
    AlertOverlay: AlertOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  // The GUID of the loaded address.
  var guid;

  /**
   * AutoFillEditAddressOverlay class
   * Encapsulated handling of the 'Add Page' overlay page.
   * @class
   */
  function AutoFillEditAddressOverlay() {
    OptionsPage.call(this, 'autoFillEditAddress',
                     templateData.autoFillEditAddressTitle,
                     'autofill-edit-address-overlay');
  }

  cr.addSingletonGetter(AutoFillEditAddressOverlay);

  AutoFillEditAddressOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('autofill-edit-address-cancel-button').onclick = function(event) {
        self.dismissOverlay_();
      }
      $('autofill-edit-address-apply-button').onclick = function(event) {
        self.saveAddress_();
        self.dismissOverlay_();
      }

      self.guid = '';
      self.populateCountryList_();
      self.clearInputFields_();
      self.connectInputEvents_();
    },

    /**
     * Clears any uncommitted input, resets the stored GUID and dismisses the
     * overlay.
     * @private
     */
    dismissOverlay_: function() {
      this.clearInputFields_();
      this.guid = '';
      OptionsPage.closeOverlay();
    },

    /**
     * Aggregates the values in the input fields into an array and sends the
     * array to the AutoFill handler.
     * @private
     */
    saveAddress_: function() {
      var address = new Array();
      address[0] = this.guid;
      address[1] = $('full-name').value;
      address[2] = $('company-name').value;
      address[3] = $('addr-line-1').value;
      address[4] = $('addr-line-2').value;
      address[5] = $('city').value;
      address[6] = $('state').value;
      address[7] = $('postal-code').value;
      address[8] = $('country').value;
      address[9] = $('phone').value;
      address[10] = $('fax').value;
      address[11] = $('email').value;

      chrome.send('setAddress', address);
    },

    /**
     * Connects each input field to the inputFieldChanged_() method that enables
     * or disables the 'Ok' button based on whether all the fields are empty or
     * not.
     * @private
     */
    connectInputEvents_: function() {
      var self = this;
      $('full-name').oninput = $('company-name').oninput =
      $('addr-line-1').oninput = $('addr-line-2').oninput = $('city').oninput =
      $('state').oninput = $('postal-code').oninput = $('phone').oninput =
      $('fax').oninput = $('email').oninput = function(event) {
        self.inputFieldChanged_();
      }

      $('country').onchange = function(event) {
        self.countryChanged_();
      }
    },

    /**
     * Checks the values of each of the input fields and disables the 'Ok'
     * button if all of the fields are empty.
     * @private
     */
    inputFieldChanged_: function() {
      var disabled =
          !$('full-name').value && !$('company-name').value &&
          !$('addr-line-1').value && !$('addr-line-2').value &&
          !$('city').value && !$('state').value && !$('postal-code').value &&
          !$('country').value && !$('phone').value && !$('fax').value &&
          !$('email').value;
      $('autofill-edit-address-apply-button').disabled = disabled;
    },

    /**
     * Updates the postal code and state field labels appropriately for the
     * selected country.
     * @private
     */
    countryChanged_: function() {
      var countryCode = $('country').value;
      if (!countryCode)
        countryCode = templateData.defaultCountryCode;

      var details = templateData.autofillCountryData[countryCode];
      var postal = $('postal-code-label');
      postal.textContent = details['postalCodeLabel'];
      $('state-label').textContent = details['stateLabel'];

      // Also update the 'Ok' button as needed.
      this.inputFieldChanged_();
    },

    /**
     * Populates the country <select> list.
     * @private
     */
    populateCountryList_: function() {
      var countryData = templateData.autofillCountryData;
      var defaultCountryCode = templateData.defaultCountryCode;

      // Build an array of the country names and their corresponding country
      // codes, so that we can sort and insert them in order.
      var countries = [];
      for (var countryCode in countryData) {
        // We always want the default country to be at the top of the list, so
        // we handle it separately.
        if (countryCode == defaultCountryCode)
          continue;

        var country = {
          countryCode: countryCode,
          name: countryData[countryCode]['name']
        };
        countries.push(country);
      }

      // Sort the countries in alphabetical order by name.
      countries = countries.sort(function(a, b) {
        return a.name < b.name ? -1 : 1;
      });

      // Insert the empty and default countries at the beginning of the array.
      var emptyCountry = {
        countryCode: '',
        name: ''
      };
      var defaultCountry = {
        countryCode: defaultCountryCode,
        name: countryData[defaultCountryCode]['name']
      };
      countries.unshift(emptyCountry, defaultCountry);

      // Add the countries to the country <select> list.
      var countryList = $('country');
      for (var i = 0; i < countries.length; i++) {
        var country = new Option(countries[i].name, countries[i].countryCode);
        countryList.appendChild(country)
      }
    },

    /**
     * Clears the value of each input field.
     * @private
     */
    clearInputFields_: function() {
      $('full-name').value = '';
      $('company-name').value = '';
      $('addr-line-1').value = '';
      $('addr-line-2').value = '';
      $('city').value = '';
      $('state').value = '';
      $('postal-code').value = '';
      $('country').value = '';
      $('phone').value = '';
      $('fax').value = '';
      $('email').value = '';

      this.countryChanged_();
    },

    /**
     * Loads the address data from |address|, sets the input fields based on
     * this data and stores the GUID of the address.
     * @private
     */
    loadAddress_: function(address) {
      this.setInputFields_(address);
      this.inputFieldChanged_();
      this.guid = address['guid'];
    },

    /**
     * Sets the value of each input field according to |address|
     * @private
     */
    setInputFields_: function(address) {
      $('full-name').value = address['fullName'];
      $('company-name').value = address['companyName'];
      $('addr-line-1').value = address['addrLine1'];
      $('addr-line-2').value = address['addrLine2'];
      $('city').value = address['city'];
      $('state').value = address['state'];
      $('postal-code').value = address['postalCode'];
      $('country').value = address['country'];
      $('phone').value = address['phone'];
      $('fax').value = address['fax'];
      $('email').value = address['email'];

      this.countryChanged_();
    },
  };

  AutoFillEditAddressOverlay.clearInputFields = function() {
    AutoFillEditAddressOverlay.getInstance().clearInputFields_();
  };

  AutoFillEditAddressOverlay.loadAddress = function(address) {
    AutoFillEditAddressOverlay.getInstance().loadAddress_(address);
  };

  AutoFillEditAddressOverlay.setTitle = function(title) {
    $('autofill-address-title').textContent = title;
  };

  // Export
  return {
    AutoFillEditAddressOverlay: AutoFillEditAddressOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  // The GUID of the loaded credit card.
  var guid_;

  // The CC number of the profile, used to check for changes to the input field.
  var storedCCNumber_;

  // Set to true if the user has edited the CC number field. When saving the
  // CC profile after editing, the stored CC number is saved if the input field
  // has not been modified.
  var hasEditedNumber_;

  /**
   * AutoFillEditCreditCardOverlay class
   * Encapsulated handling of the 'Add Page' overlay page.
   * @class
   */
  function AutoFillEditCreditCardOverlay() {
    OptionsPage.call(this, 'autoFillEditCreditCard',
                     templateData.autoFillEditCreditCardTitle,
                     'autofill-edit-credit-card-overlay');
  }

  cr.addSingletonGetter(AutoFillEditCreditCardOverlay);

  AutoFillEditCreditCardOverlay.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('autofill-edit-credit-card-cancel-button').onclick = function(event) {
        self.dismissOverlay_();
      }
      $('autofill-edit-credit-card-apply-button').onclick = function(event) {
        self.saveCreditCard_();
        self.dismissOverlay_();
      }

      self.guid_ = '';
      self.storedCCNumber_ = '';
      self.hasEditedNumber_ = false;
      self.clearInputFields_();
      self.connectInputEvents_();
      self.setDefaultSelectOptions_();
    },

    /**
     * Clears any uncommitted input, and dismisses the overlay.
     * @private
     */
    dismissOverlay_: function() {
      this.clearInputFields_();
      this.guid_ = '';
      this.storedCCNumber_ = '';
      this.hasEditedNumber_ = false;
      OptionsPage.closeOverlay();
    },

    /**
     * Aggregates the values in the input fields into an array and sends the
     * array to the AutoFill handler.
     * @private
     */
    saveCreditCard_: function() {
      var creditCard = new Array(5);
      creditCard[0] = this.guid_;
      creditCard[1] = $('name-on-card').value;
      creditCard[3] = $('expiration-month').value;
      creditCard[4] = $('expiration-year').value;

      if (this.hasEditedNumber_)
        creditCard[2] = $('credit-card-number').value;
      else
        creditCard[2] = this.storedCCNumber_;

      chrome.send('setCreditCard', creditCard);
    },

    /**
     * Connects each input field to the inputFieldChanged_() method that enables
     * or disables the 'Ok' button based on whether all the fields are empty or
     * not.
     * @private
     */
    connectInputEvents_: function() {
      $('name-on-card').oninput = $('credit-card-number').oninput =
          $('expiration-month').onchange = $('expiration-year').onchange =
              this.inputFieldChanged_.bind(this);
    },

    /**
     * Checks the values of each of the input fields and disables the 'Ok'
     * button if all of the fields are empty.
     * @param {Event} opt_event Optional data for the 'input' event.
     * @private
     */
    inputFieldChanged_: function(opt_event) {
      var ccNumber = $('credit-card-number');
      var disabled = !$('name-on-card').value && !ccNumber.value;
      $('autofill-edit-credit-card-apply-button').disabled = disabled;

      if (opt_event && opt_event.target == ccNumber) {
        // If the user hasn't edited the text yet, delete it all on edit.
        if (!this.hasEditedNumber_ && this.storedCCNumber_.length &&
            ccNumber.value != this.storedCCNumber_) {
          ccNumber.value = '';
        }

        this.hasEditedNumber_ = true;
      }
    },

    /**
     * Sets the default values of the options in the 'Expiration date' select
     * controls.
     * @private
     */
    setDefaultSelectOptions_: function() {
      // Set the 'Expiration month' default options.
      var expirationMonth = $('expiration-month');
      expirationMonth.options.length = 0;
      for (var i = 1; i <= 12; ++i) {
        var text;
        if (i < 10)
          text = '0' + i;
        else
          text = i;

        var option = document.createElement('option');
        option.text = text;
        option.value = text;
        expirationMonth.add(option, null);
      }

      // Set the 'Expiration year' default options.
      var expirationYear = $('expiration-year');
      expirationYear.options.length = 0;

      var date = new Date();
      var year = parseInt(date.getFullYear());
      for (var i = 0; i < 10; ++i) {
        var text = year + i;
        var option = document.createElement('option');
        option.text = text;
        option.value = text;
        expirationYear.add(option, null);
      }
    },

    /**
     * Clears the value of each input field.
     * @private
     */
    clearInputFields_: function() {
      $('name-on-card').value = '';
      $('credit-card-number').value = '';
      $('expiration-month').selectedIndex = 0;
      $('expiration-year').selectedIndex = 0;
    },

    /**
     * Sets the value of each input field according to |creditCard|
     * @private
     */
    setInputFields_: function(creditCard) {
      $('name-on-card').value = creditCard['nameOnCard'];
      $('credit-card-number').value = creditCard['obfuscatedCardNumber'];

      // The options for the year select control may be out-dated at this point,
      // e.g. the user opened the options page before midnight on New Year's Eve
      // and then loaded a credit card profile to edit in the new year, so
      // reload the select options just to be safe.
      this.setDefaultSelectOptions_();

      var idx = parseInt(creditCard['expirationMonth'], 10);
      $('expiration-month').selectedIndex = idx - 1;

      expYear = creditCard['expirationYear'];
      var date = new Date();
      var year = parseInt(date.getFullYear());
      for (var i = 0; i < 10; ++i) {
        var text = year + i;
        if (expYear == String(text))
          $('expiration-year').selectedIndex = i;
      }
    },

    /**
     * Loads the credit card data from |creditCard|, sets the input fields based
     * on this data and stores the GUID of the credit card.
     * @private
     */
    loadCreditCard_: function(creditCard) {
      this.setInputFields_(creditCard);
      this.inputFieldChanged_();
      this.guid_ = creditCard['guid'];
      this.storedCCNumber_ = creditCard['creditCardNumber'];
    },
  };

  AutoFillEditCreditCardOverlay.clearInputFields = function(title) {
    AutoFillEditCreditCardOverlay.getInstance().clearInputFields_();
  };

  AutoFillEditCreditCardOverlay.loadCreditCard = function(creditCard) {
    AutoFillEditCreditCardOverlay.getInstance().loadCreditCard_(creditCard);
  };

  AutoFillEditCreditCardOverlay.setTitle = function(title) {
    $('autofill-credit-card-title').textContent = title;
  };

  // Export
  return {
    AutoFillEditCreditCardOverlay: AutoFillEditCreditCardOverlay
  };
});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.autoFillOptions', function() {
  const DeletableItem = options.DeletableItem;
  const DeletableItemList = options.DeletableItemList;

  /**
   * Creates a new address list item.
   * @param {Array} entry An array of the form [guid, label].
   * @constructor
   * @extends {options.DeletableItem}
   */
  function AddressListItem(entry) {
    var el = cr.doc.createElement('div');
    el.guid = entry[0];
    el.label = entry[1];
    el.__proto__ = AddressListItem.prototype;
    el.decorate();

    return el;
  }

  AddressListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /** @inheritDoc */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);

      // The stored label.
      var label = this.ownerDocument.createElement('div');
      label.className = 'autofill-list-item';
      label.textContent = this.label;
      this.contentElement.appendChild(label);
    },
  };

  /**
   * Creates a new credit card list item.
   * @param {Array} entry An array of the form [guid, label, icon].
   * @constructor
   * @extends {options.DeletableItem}
   */
  function CreditCardListItem(entry) {
    var el = cr.doc.createElement('div');
    el.guid = entry[0];
    el.label = entry[1];
    el.icon = entry[2];
    el.__proto__ = CreditCardListItem.prototype;
    el.decorate();

    return el;
  }

  CreditCardListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /** @inheritDoc */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);

      // The stored label.
      var label = this.ownerDocument.createElement('div');
      label.className = 'autofill-list-item';
      label.textContent = this.label;
      this.contentElement.appendChild(label);

      // The credit card icon.
      var icon = this.ownerDocument.createElement('image');
      icon.src = this.icon;
      this.contentElement.appendChild(icon);
    },
  };

  /**
   * Create a new address list.
   * @constructor
   * @extends {options.DeletableItemList}
   */
  var AutoFillAddressList = cr.ui.define('list');

  AutoFillAddressList.prototype = {
    __proto__: DeletableItemList.prototype,

    decorate: function() {
      DeletableItemList.prototype.decorate.call(this);

      this.addEventListener('blur', this.onBlur_);
    },

    /**
     * When the list loses focus, unselect all items in the list.
     * @private
     */
    onBlur_: function() {
      this.selectionModel.unselectAll();
    },

    /** @inheritDoc */
    createItem: function(entry) {
      return new AddressListItem(entry);
    },

    /** @inheritDoc */
    activateItemAtIndex: function(index) {
      AutoFillOptions.loadAddressEditor(this.dataModel.item(index)[0]);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      AutoFillOptions.removeAddress(this.dataModel.item(index)[0]);
    },
  };

  /**
   * Create a new credit card list.
   * @constructor
   * @extends {options.DeletableItemList}
   */
  var AutoFillCreditCardList = cr.ui.define('list');

  AutoFillCreditCardList.prototype = {
    __proto__: DeletableItemList.prototype,

    decorate: function() {
      DeletableItemList.prototype.decorate.call(this);

      this.addEventListener('blur', this.onBlur_);
    },

    /**
     * When the list loses focus, unselect all items in the list.
     * @private
     */
    onBlur_: function() {
      this.selectionModel.unselectAll();
    },

    /** @inheritDoc */
    createItem: function(entry) {
      return new CreditCardListItem(entry);
    },

    /** @inheritDoc */
    activateItemAtIndex: function(index) {
      AutoFillOptions.loadCreditCardEditor(this.dataModel.item(index)[0]);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      AutoFillOptions.removeCreditCard(this.dataModel.item(index)[0]);
    },
  };

  return {
    AddressListItem: AddressListItem,
    CreditCardListItem: CreditCardListItem,
    AutoFillAddressList: AutoFillAddressList,
    AutoFillCreditCardList: AutoFillCreditCardList,
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const ArrayDataModel = cr.ui.ArrayDataModel;

  /////////////////////////////////////////////////////////////////////////////
  // AutoFillOptions class:

  /**
   * Encapsulated handling of AutoFill options page.
   * @constructor
   */
  function AutoFillOptions() {
    OptionsPage.call(this,
                     'autofill',
                     templateData.autoFillOptionsPageTabTitle,
                     'autofill-options');
  }

  cr.addSingletonGetter(AutoFillOptions);

  AutoFillOptions.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * The address list.
     * @type {DeletableItemList}
     * @private
     */
    addressList_: null,

    /**
     * The credit card list.
     * @type {DeletableItemList}
     * @private
     */
    creditCardList_: null,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      this.createAddressList_();
      this.createCreditCardList_();

      var self = this;
      $('autofill-add-address').onclick = function(event) {
        self.showAddAddressOverlay_();
      };
      $('autofill-add-creditcard').onclick = function(event) {
        self.showAddCreditCardOverlay_();
      };

      // TODO(jhawkins): What happens when AutoFill is disabled whilst on the
      // AutoFill options page?
    },

    /**
     * Creates, decorates and initializes the address list.
     * @private
     */
    createAddressList_: function() {
      this.addressList_ = $('address-list');
      options.autoFillOptions.AutoFillAddressList.decorate(this.addressList_);
      this.addressList_.autoExpands = true;
    },

    /**
     * Creates, decorates and initializes the credit card list.
     * @private
     */
    createCreditCardList_: function() {
      this.creditCardList_ = $('creditcard-list');
      options.autoFillOptions.AutoFillCreditCardList.decorate(
          this.creditCardList_);
      this.creditCardList_.autoExpands = true;
    },

    /**
     * Shows the 'Add address' overlay, specifically by loading the
     * 'Edit address' overlay, emptying the input fields and modifying the
     * overlay title.
     * @private
     */
    showAddAddressOverlay_: function() {
      var title = localStrings.getString('addAddressTitle');
      AutoFillEditAddressOverlay.setTitle(title);
      AutoFillEditAddressOverlay.clearInputFields();
      OptionsPage.navigateToPage('autoFillEditAddress');
    },

    /**
     * Shows the 'Add credit card' overlay, specifically by loading the
     * 'Edit credit card' overlay, emptying the input fields and modifying the
     * overlay title.
     * @private
     */
    showAddCreditCardOverlay_: function() {
      var title = localStrings.getString('addCreditCardTitle');
      AutoFillEditCreditCardOverlay.setTitle(title);
      AutoFillEditCreditCardOverlay.clearInputFields();
      OptionsPage.navigateToPage('autoFillEditCreditCard');
    },

    /**
     * Updates the data model for the address list with the values from
     * |entries|.
     * @param {Array} entries The list of addresses.
     */
    setAddressList_: function(entries) {
      this.addressList_.dataModel = new ArrayDataModel(entries);
    },

    /**
     * Updates the data model for the credit card list with the values from
     * |entries|.
     * @param {Array} entries The list of credit cards.
     */
    setCreditCardList_: function(entries) {
      this.creditCardList_.dataModel = new ArrayDataModel(entries);
    },

    /**
     * Removes the AutoFill address represented by |guid|.
     * @param {String} guid The GUID of the address to remove.
     * @private
     */
    removeAddress_: function(guid) {
      chrome.send('removeAddress', [guid]);
    },

    /**
     * Removes the AutoFill credit card represented by |guid|.
     * @param {String} guid The GUID of the credit card to remove.
     * @private
     */
    removeCreditCard_: function(guid) {
      chrome.send('removeCreditCard', [guid]);
    },

    /**
     * Requests profile data for the address represented by |guid| from the
     * PersonalDataManager. Once the data is loaded, the AutoFillOptionsHandler
     * calls showEditAddressOverlay().
     * @param {String} guid The GUID of the address to edit.
     * @private
     */
    loadAddressEditor_: function(guid) {
      chrome.send('loadAddressEditor', [guid]);
    },

    /**
     * Requests profile data for the credit card represented by |guid| from the
     * PersonalDataManager. Once the data is loaded, the AutoFillOptionsHandler
     * calls showEditCreditCardOverlay().
     * @param {String} guid The GUID of the credit card to edit.
     * @private
     */
    loadCreditCardEditor_: function(guid) {
      chrome.send('loadCreditCardEditor', [guid]);
    },

    /**
     * Shows the 'Edit address' overlay, using the data in |address| to fill the
     * input fields. |address| is a list with one item, an associative array
     * that contains the address data.
     * @private
     */
    showEditAddressOverlay_: function(address) {
      var title = localStrings.getString('editAddressTitle');
      AutoFillEditAddressOverlay.setTitle(title);
      AutoFillEditAddressOverlay.loadAddress(address);
      OptionsPage.navigateToPage('autoFillEditAddress');
    },

    /**
     * Shows the 'Edit credit card' overlay, using the data in |credit_card| to
     * fill the input fields. |address| is a list with one item, an associative
     * array that contains the credit card data.
     * @private
     */
    showEditCreditCardOverlay_: function(creditCard) {
      var title = localStrings.getString('editCreditCardTitle');
      AutoFillEditCreditCardOverlay.setTitle(title);
      AutoFillEditCreditCardOverlay.loadCreditCard(creditCard);
      OptionsPage.navigateToPage('autoFillEditCreditCard');
    },
  };

  AutoFillOptions.setAddressList = function(entries) {
    AutoFillOptions.getInstance().setAddressList_(entries);
  };

  AutoFillOptions.setCreditCardList = function(entries) {
    AutoFillOptions.getInstance().setCreditCardList_(entries);
  };

  AutoFillOptions.removeAddress = function(guid) {
    AutoFillOptions.getInstance().removeAddress_(guid);
  };

  AutoFillOptions.removeCreditCard = function(guid) {
    AutoFillOptions.getInstance().removeCreditCard_(guid);
  };

  AutoFillOptions.loadAddressEditor = function(guid) {
    AutoFillOptions.getInstance().loadAddressEditor_(guid);
  };

  AutoFillOptions.loadCreditCardEditor = function(guid) {
    AutoFillOptions.getInstance().loadCreditCardEditor_(guid);
  };

  AutoFillOptions.editAddress = function(address) {
    AutoFillOptions.getInstance().showEditAddressOverlay_(address);
  };

  AutoFillOptions.editCreditCard = function(creditCard) {
    AutoFillOptions.getInstance().showEditCreditCardOverlay_(creditCard);
  };

  // Export
  return {
    AutoFillOptions: AutoFillOptions
  };

});

/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const ArrayDataModel = cr.ui.ArrayDataModel;

  //
  // BrowserOptions class
  // Encapsulated handling of browser options page.
  //
  function BrowserOptions() {
    OptionsPage.call(this, 'browser',
                     templateData.browserPageTabTitle,
                     'browserPage');
  }

  cr.addSingletonGetter(BrowserOptions);

  BrowserOptions.prototype = {
    // Inherit BrowserOptions from OptionsPage.
    __proto__: options.OptionsPage.prototype,

    startup_pages_pref_: {
      'name': 'session.urls_to_restore_on_startup',
      'managed': false
    },

    homepage_pref_: {
      'name': 'homepage',
      'value': '',
      'managed': false
    },

    homepage_is_newtabpage_pref_: {
      'name': 'homepage_is_newtabpage',
      'value': true,
      'managed': false
    },

    // The cached value of the instant.confirm_dialog_shown preference.
    instantConfirmDialogShown_: false,

    /**
     * Initialize BrowserOptions page.
     */
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      // Wire up controls.
      $('startupUseCurrentButton').onclick = function(event) {
        chrome.send('setStartupPagesToCurrentPages');
      };
      $('startupAddButton').onclick = function(event) {
        OptionsPage.navigateToPage('addStartupPage');
      };
      $('defaultSearchManageEnginesButton').onclick = function(event) {
        OptionsPage.navigateToPage('searchEngines');
        chrome.send('coreOptionsUserMetricsAction',
            ['Options_ManageSearchEngines']);
      };
      $('defaultSearchEngine').onchange = this.setDefaultSearchEngine;

      var self = this;
      $('instantEnableCheckbox').onclick = function(event) {
        if (this.checked && !self.instantConfirmDialogShown_) {
          // Leave disabled for now. The PrefCheckbox handler already set it to
          // true so undo that.
          Preferences.setBooleanPref(this.pref, false, this.metric);
          OptionsPage.navigateToPage('instantConfirm');
        }
      };

      Preferences.getInstance().addEventListener('instant.confirm_dialog_shown',
          this.onInstantConfirmDialogShownChanged_.bind(this));

      var homepageField = $('homepageURL');
      $('homepageUseNTPButton').onchange =
          this.handleHomepageUseNTPButtonChange_.bind(this);
      $('homepageUseURLButton').onchange =
          this.handleHomepageUseURLButtonChange_.bind(this);
      homepageField.onchange = this.handleHomepageURLChange_.bind(this);
      homepageField.oninput = this.handleHomepageURLChange_.bind(this);

      // Ensure that changes are committed when closing the page.
      window.addEventListener('unload', function() {
        if (document.activeElement == homepageField)
          homepageField.blur();
      });

      // Remove Windows-style accelerators from button labels.
      // TODO(stuartmorgan): Remove this once the strings are updated.
      $('startupAddButton').textContent =
          localStrings.getStringWithoutAccelerator('startupAddButton');

      if (!cr.isChromeOS) {
        $('defaultBrowserUseAsDefaultButton').onclick = function(event) {
          chrome.send('becomeDefaultBrowser');
        };
      }

      var list = $('startupPagesList');
      options.browser_options.StartupPageList.decorate(list);
      list.autoExpands = true;

      // Check if we are in the guest mode.
      if (cr.commandLine.options['--bwsi']) {
        // Hide the startup section.
        $('startupSection').classList.add('hidden');
      } else {
        // Initialize control enabled states.
        Preferences.getInstance().addEventListener('session.restore_on_startup',
            this.updateCustomStartupPageControlStates_.bind(this));
        Preferences.getInstance().addEventListener(
            this.startup_pages_pref_.name,
            this.handleStartupPageListChange_.bind(this));
        Preferences.getInstance().addEventListener(
            this.homepage_pref_.name,
            this.handleHomepageChange_.bind(this));
        Preferences.getInstance().addEventListener(
            this.homepage_is_newtabpage_pref_.name,
            this.handleHomepageIsNewTabPageChange_.bind(this));

        this.updateCustomStartupPageControlStates_();
      }
    },

    /**
     * Called when the value of the instant.confirm_dialog_shown preference
     * changes. Cache this value.
     * @param {Event} event Change event.
     * @private
     */
    onInstantConfirmDialogShownChanged_: function(event) {
      this.instantConfirmDialogShown_ = event.value['value'];
    },

    /**
     * Update the Default Browsers section based on the current state.
     * @param {string} statusString Description of the current default state.
     * @param {boolean} isDefault Whether or not the browser is currently
     *     default.
     * @param {boolean} canBeDefault Whether or not the browser can be default.
     * @private
     */
    updateDefaultBrowserState_: function(statusString, isDefault,
                                         canBeDefault) {
      var label = $('defaultBrowserState');
      label.textContent = statusString;

      $('defaultBrowserUseAsDefaultButton').disabled = !canBeDefault ||
                                                       isDefault;
    },

    /**
     * Clears the search engine popup.
     * @private
     */
    clearSearchEngines_: function() {
      $('defaultSearchEngine').textContent = '';
    },

    /**
     * Updates the search engine popup with the given entries.
     * @param {Array} engines List of available search engines.
     * @param {number} defaultValue The value of the current default engine.
     */
    updateSearchEngines_: function(engines, defaultValue) {
      this.clearSearchEngines_();
      engineSelect = $('defaultSearchEngine');
      engineCount = engines.length;
      var defaultIndex = -1;
      for (var i = 0; i < engineCount; i++) {
        var engine = engines[i];
        var option = new Option(engine['name'], engine['index']);
        if (defaultValue == option.value)
          defaultIndex = i;
        engineSelect.appendChild(option);
      }
      if (defaultIndex >= 0)
        engineSelect.selectedIndex = defaultIndex;
    },

    /**
     * Returns true if the custom startup page control block should
     * be enabled.
     * @returns {boolean} Whether the startup page controls should be
     *     enabled.
     */
    shouldEnableCustomStartupPageControls: function(pages) {
      return $('startupShowPagesButton').checked &&
          !this.startup_pages_pref_.managed;
    },

    /**
     * Updates the startup pages list with the given entries.
     * @param {Array} pages List of startup pages.
     * @private
     */
    updateStartupPages_: function(pages) {
      $('startupPagesList').dataModel = new ArrayDataModel(pages);
    },

    /**
     * Handles change events of the radio button 'homepageUseURLButton'.
     * @param {event} change event.
     * @private
     */
    handleHomepageUseURLButtonChange_: function(event) {
      Preferences.setBooleanPref(this.homepage_is_newtabpage_pref_.name, false);
    },

    /**
     * Handles change events of the radio button 'homepageUseNTPButton'.
     * @param {event} change event.
     * @private
     */
    handleHomepageUseNTPButtonChange_: function(event) {
      Preferences.setBooleanPref(this.homepage_is_newtabpage_pref_.name, true);
    },

    /**
     * Handles input and change events of the text field 'homepageURL'.
     * @param {event} input/change event.
     * @private
     */
    handleHomepageURLChange_: function(event) {
      var doFixup = event.type == 'change' ? '1' : '0';
      chrome.send('setHomePage', [$('homepageURL').value, doFixup]);
    },

    /**
     * Handle change events of the preference 'homepage'.
     * @param {event} preference changed event.
     * @private
     */
    handleHomepageChange_: function(event) {
      this.homepage_pref_.value = event.value['value'];
      this.homepage_pref_.managed = event.value['managed'];
      if (this.isHomepageURLNewTabPageURL_() && !this.homepage_pref_.managed &&
          !this.homepage_is_newtabpage_pref_.managed) {
        var useNewTabPage = this.isHomepageIsNewTabPageChoiceSelected_();
        Preferences.setStringPref(this.homepage_pref_.name, '')
        Preferences.setBooleanPref(this.homepage_is_newtabpage_pref_.name,
                                   useNewTabPage)
      }
      this.updateHomepageControlStates_();
    },

    /**
     * Handle change events of the preference homepage_is_newtabpage.
     * @param {event} preference changed event.
     * @private
     */
    handleHomepageIsNewTabPageChange_: function(event) {
      this.homepage_is_newtabpage_pref_.value = event.value['value'];
      this.homepage_is_newtabpage_pref_.managed = event.value['managed'];
      this.updateHomepageControlStates_();
    },

    /**
     * Update homepage preference UI controls.  Here's a table describing the
     * desired characteristics of the homepage choice radio value, its enabled
     * state and the URL field enabled state. They depend on the values of the
     * managed bits for homepage (m_hp) and homepageIsNewTabPage (m_ntp)
     * preferences, as well as the value of the homepageIsNewTabPage preference
     * (ntp) and whether the homepage preference is equal to the new tab page
     * URL (hpisntp).
     *
     * m_hp m_ntp ntp hpisntp| choice value| choice enabled| URL field enabled
     * ------------------------------------------------------------------------
     * 0    0     0   0      | homepage    | 1             | 1
     * 0    0     0   1      | new tab page| 1             | 0
     * 0    0     1   0      | new tab page| 1             | 0
     * 0    0     1   1      | new tab page| 1             | 0
     * 0    1     0   0      | homepage    | 0             | 1
     * 0    1     0   1      | homepage    | 0             | 1
     * 0    1     1   0      | new tab page| 0             | 0
     * 0    1     1   1      | new tab page| 0             | 0
     * 1    0     0   0      | homepage    | 1             | 0
     * 1    0     0   1      | new tab page| 0             | 0
     * 1    0     1   0      | new tab page| 1             | 0
     * 1    0     1   1      | new tab page| 0             | 0
     * 1    1     0   0      | homepage    | 0             | 0
     * 1    1     0   1      | new tab page| 0             | 0
     * 1    1     1   0      | new tab page| 0             | 0
     * 1    1     1   1      | new tab page| 0             | 0
     *
     * thus, we have:
     *
     *    choice value is new tab page === ntp || (hpisntp && (m_hp || !m_ntp))
     *    choice enabled === !m_ntp && !(m_hp && hpisntp)
     *    URL field enabled === !ntp && !mhp && !(hpisntp && !m_ntp)
     *
     * which also make sense if you think about them.
     * @private
     */
    updateHomepageControlStates_: function() {
      var homepageField = $('homepageURL');
      homepageField.disabled = !this.isHomepageURLFieldEnabled_();
      if (homepageField.value != this.homepage_pref_.value)
        homepageField.value = this.homepage_pref_.value;
      homepageField.style.backgroundImage = url('chrome://favicon/' +
                                                this.homepage_pref_.value);
      var disableChoice = !this.isHomepageChoiceEnabled_();
      $('homepageUseURLButton').disabled = disableChoice;
      $('homepageUseNTPButton').disabled = disableChoice;
      var useNewTabPage = this.isHomepageIsNewTabPageChoiceSelected_();
      $('homepageUseNTPButton').checked = useNewTabPage;
      $('homepageUseURLButton').checked = !useNewTabPage;
    },

    /**
     * Tests whether the value of the 'homepage' preference equls the new tab
     * page url (chrome://newtab).
     * @returns {boolean} True if the 'homepage' value equals the new tab page
     *     url.
     * @private
     */
    isHomepageURLNewTabPageURL_ : function() {
      return (this.homepage_pref_.value.toLowerCase() == 'chrome://newtab');
    },

    /**
     * Tests whether the Homepage choice "Use New Tab Page" is selected.
     * @returns {boolean} True if "Use New Tab Page" is selected.
     * @private
     */
    isHomepageIsNewTabPageChoiceSelected_: function() {
      return (this.homepage_is_newtabpage_pref_.value ||
              (this.isHomepageURLNewTabPageURL_() &&
               (this.homepage_pref_.managed ||
                !this.homepage_is_newtabpage_pref_.managed)));
    },

    /**
     * Tests whether the home page choice controls are enabled.
     * @returns {boolean} True if the home page choice controls are enabled.
     * @private
     */
    isHomepageChoiceEnabled_: function() {
      return (!this.homepage_is_newtabpage_pref_.managed &&
              !(this.homepage_pref_.managed &&
                this.isHomepageURLNewTabPageURL_()));
    },

    /**
     * Checks whether the home page field should be enabled.
     * @returns {boolean} True if the home page field should be enabled.
     * @private
     */
    isHomepageURLFieldEnabled_: function() {
      return (!this.homepage_is_newtabpage_pref_.value &&
              !this.homepage_pref_.managed &&
              !(this.isHomepageURLNewTabPageURL_() &&
                !this.homepage_is_newtabpage_pref_.managed));
    },

    /**
     * Sets the enabled state of the custom startup page list controls
     * based on the current startup radio button selection.
     * @private
     */
    updateCustomStartupPageControlStates_: function() {
      var disable = !this.shouldEnableCustomStartupPageControls();
      $('startupPagesList').disabled = disable;
      $('startupUseCurrentButton').disabled = disable;
      $('startupAddButton').disabled = disable;
    },

    /**
     * Handle change events of the preference
     * 'session.urls_to_restore_on_startup'.
     * @param {event} preference changed event.
     * @private
     */
    handleStartupPageListChange_: function(event) {
      this.startup_pages_pref_.managed = event.value['managed'];
      this.updateCustomStartupPageControlStates_();
    },

    /**
     * Set the default search engine based on the popup selection.
     */
    setDefaultSearchEngine: function() {
      var engineSelect = $('defaultSearchEngine');
      var selectedIndex = engineSelect.selectedIndex;
      if (selectedIndex >= 0) {
        var selection = engineSelect.options[selectedIndex];
        chrome.send('setDefaultSearchEngine', [String(selection.value)]);
      }
    },

    /**
     * Adds the given startup page at the current selection point.
     * @private
     */
    addStartupPage_: function(url) {
      var selectedIndex =
          $('startupPagesList').selectionModel.selectedIndex;
      chrome.send('addStartupPage', [url, String(selectedIndex)]);
    },
  };

  BrowserOptions.updateDefaultBrowserState = function(statusString, isDefault,
                                                      canBeDefault) {
    if (!cr.isChromeOS) {
      BrowserOptions.getInstance().updateDefaultBrowserState_(statusString,
                                                              isDefault,
                                                              canBeDefault);
    }
  };

  BrowserOptions.updateSearchEngines = function(engines, defaultValue) {
    BrowserOptions.getInstance().updateSearchEngines_(engines, defaultValue);
  };

  BrowserOptions.updateStartupPages = function(pages) {
    BrowserOptions.getInstance().updateStartupPages_(pages);
  };

  BrowserOptions.addStartupPage = function(url) {
    BrowserOptions.getInstance().addStartupPage_(url);
  };

  // Export
  return {
    BrowserOptions: BrowserOptions
  };

});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.browser_options', function() {
  const InlineEditableItem = options.InlineEditableItem;
  const InlineEditableItemList = options.InlineEditableItemList;

  /**
   * Creates a new startup page list item.
   * @param {Object} pageInfo The page this item represents.
   * @constructor
   * @extends {cr.ui.ListItem}
   */
  function StartupPageListItem(pageInfo) {
    var el = cr.doc.createElement('div');
    el.pageInfo_ = pageInfo;
    StartupPageListItem.decorate(el);
    return el;
  }

  /**
   * Decorates an element as a startup page list item.
   * @param {!HTMLElement} el The element to decorate.
   */
  StartupPageListItem.decorate = function(el) {
    el.__proto__ = StartupPageListItem.prototype;
    el.decorate();
  };

  StartupPageListItem.prototype = {
    __proto__: InlineEditableItem.prototype,

    /**
     * Input field for editing the page url.
     * @type {HTMLElement}
     * @private
     */
    urlField_: null,

    /** @inheritDoc */
    decorate: function() {
      InlineEditableItem.prototype.decorate.call(this);

      var titleEl = this.ownerDocument.createElement('div');
      titleEl.className = 'title';
      titleEl.classList.add('favicon-cell');
      titleEl.textContent = this.pageInfo_['title'];
      titleEl.style.backgroundImage = url('chrome://favicon/' +
                                          this.pageInfo_['url']);
      titleEl.title = this.pageInfo_['tooltip'];

      this.contentElement.appendChild(titleEl);

      var urlEl = this.createEditableTextCell(this.pageInfo_['url']);
      urlEl.className = 'url';
      this.contentElement.appendChild(urlEl);

      this.urlField_ = urlEl.querySelector('input');
      this.urlField_.required = true;

      this.addEventListener('commitedit', this.onEditCommitted_.bind(this));
    },

    /** @inheritDoc */
    get currentInputIsValid() {
      return this.urlField_.validity.valid;
    },

    /** @inheritDoc */
    get hasBeenEdited() {
      return this.urlField_.value != this.pageInfo_['url'];
    },

    /**
     * Called when committing an edit; updates the model.
     * @param {Event} e The end event.
     * @private
     */
    onEditCommitted_: function(e) {
      chrome.send('editStartupPage',
                  [this.pageInfo_['modelIndex'], this.urlField_.value]);
    },
  };

  var StartupPageList = cr.ui.define('list');

  StartupPageList.prototype = {
    __proto__: InlineEditableItemList.prototype,

    /** @inheritDoc */
    createItem: function(pageInfo) {
      return new StartupPageListItem(pageInfo);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      chrome.send('removeStartupPages', [String(index)]);
    },
  };

  return {
    StartupPageList: StartupPageList
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  var OptionsPage = options.OptionsPage;

  /**
   * ClearBrowserDataOverlay class
   * Encapsulated handling of the 'Clear Browser Data' overlay page.
   * @class
   */
  function ClearBrowserDataOverlay() {
    OptionsPage.call(this, 'clearBrowserData',
                     templateData.clearBrowserDataOverlayTabTitle,
                     'clearBrowserDataOverlay');
  }

  cr.addSingletonGetter(ClearBrowserDataOverlay);

  ClearBrowserDataOverlay.prototype = {
    // Inherit ClearBrowserDataOverlay from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      // Call base class implementation to starts preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      var f = this.updateCommitButtonState_.bind(this);
      var types = ['browser.clear_data.browsing_history',
                   'browser.clear_data.download_history',
                   'browser.clear_data.cache',
                   'browser.clear_data.cookies',
                   'browser.clear_data.passwords',
                   'browser.clear_data.form_data'];
      types.forEach(function(type) {
          Preferences.getInstance().addEventListener(type, f);
      });

      var checkboxes = document.querySelectorAll(
          '#cbdContentArea input[type=checkbox]');
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onclick = f;
      }
      this.updateCommitButtonState_();

      $('clearBrowserDataDismiss').onclick = function(event) {
        ClearBrowserDataOverlay.dismiss();
      };
      $('clearBrowserDataCommit').onclick = function(event) {
        chrome.send('performClearBrowserData');
      };
    },

    // Set the enabled state of the commit button.
    updateCommitButtonState_: function() {
      var checkboxes = document.querySelectorAll(
          '#cbdContentArea input[type=checkbox]');
      var isChecked = false;
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          isChecked = true;
          break;
        }
      }
      $('clearBrowserDataCommit').disabled = !isChecked;
    },
  };

  //
  // Chrome callbacks
  //
  ClearBrowserDataOverlay.setClearingState = function(state) {
    $('deleteBrowsingHistoryCheckbox').disabled = state;
    $('deleteDownloadHistoryCheckbox').disabled = state;
    $('deleteCacheCheckbox').disabled = state;
    $('deleteCookiesCheckbox').disabled = state;
    $('deletePasswordsCheckbox').disabled = state;
    $('deleteFormDataCheckbox').disabled = state;
    $('clearBrowserDataTimePeriod').disabled = state;
    $('cbdThrobber').style.visibility = state ? 'visible' : 'hidden';

    if (state)
      $('clearBrowserDataCommit').disabled = true;
    else
      ClearBrowserDataOverlay.getInstance().updateCommitButtonState_();
  };

  ClearBrowserDataOverlay.setClearLocalDataLabel = function(label) {
    $('deleteCookiesLabel').innerText = label;
  };

  ClearBrowserDataOverlay.doneClearing = function() {
    // The delay gives the user some feedback that the clearing
    // actually worked. Otherwise the dialog just vanishes instantly in most
    // cases.
    window.setTimeout(function() {
      ClearBrowserDataOverlay.dismiss();
    }, 200);
  };

  ClearBrowserDataOverlay.dismiss = function() {
    OptionsPage.closeOverlay();
    this.setClearingState(false);
  };

  // Export
  return {
    ClearBrowserDataOverlay: ClearBrowserDataOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  //////////////////////////////////////////////////////////////////////////////
  // ContentSettings class:

  /**
   * Encapsulated handling of content settings page.
   * @constructor
   */
  function ContentSettings() {
    this.activeNavTab = null;
    OptionsPage.call(this, 'content', templateData.contentSettingsPageTabTitle,
                     'content-settings-page');
  }

  cr.addSingletonGetter(ContentSettings);

  ContentSettings.prototype = {
    __proto__: OptionsPage.prototype,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      chrome.send('getContentFilterSettings');

      var exceptionsButtons =
          this.pageDiv.querySelectorAll('.exceptions-list-button');
      for (var i = 0; i < exceptionsButtons.length; i++) {
        exceptionsButtons[i].onclick = function(event) {
          var page = ContentSettingsExceptionsArea.getInstance();
          page.showList(
              event.target.getAttribute('contentType'));
          OptionsPage.navigateToPage('contentExceptions');
          // Add on the proper hash for the content type, and store that in the
          // history so back/forward and tab restore works.
          var hash = event.target.getAttribute('contentType');
          window.history.replaceState({pageName: page.name}, page.title,
                                      '/' + page.name + "#" + hash);
        };
      }

      // Cookies filter page ---------------------------------------------------
      $('block-third-party-cookies').onclick = function(event) {
        chrome.send('setAllowThirdPartyCookies',
                    [String($('block-third-party-cookies').checked)]);
      };

      $('show-cookies-button').onclick = function(event) {
        chrome.send('coreOptionsUserMetricsAction', ['Options_ShowCookies']);
        OptionsPage.navigateToPage('cookies');
      };

      if (!templateData.enable_click_to_play)
        $('click_to_play').style.display = 'none';
    },
  };

  /**
   * Sets the values for all the content settings radios.
   * @param {Object} dict A mapping from radio groups to the checked value for
   *     that group.
   */
  ContentSettings.setContentFilterSettingsValue = function(dict) {
    for (var group in dict) {
      document.querySelector('input[type=radio][name=' + group + '][value=' +
                             dict[group]['value'] + ']').checked = true;
      var radios = document.querySelectorAll('input[type=radio][name=' +
                                             group + ']');
      for (var i = 0, len = radios.length; i < len; i++) {
        radios[i].disabled = dict[group]['managed'];
        radios[i].managed = dict[group]['managed'];
      }
    }
    OptionsPage.updateManagedBannerVisibility();
  };

  /**
   * Initializes an exceptions list.
   * @param {string} type The content type that we are setting exceptions for.
   * @param {Array} list An array of pairs, where the first element of each pair
   *     is the filter string, and the second is the setting (allow/block).
   */
  ContentSettings.setExceptions = function(type, list) {
    var exceptionsList =
        document.querySelector('div[contentType=' + type + ']' +
                               ' list[mode=normal]');

    exceptionsList.setExceptions(list);
  };

  ContentSettings.setOTRExceptions = function(type, list) {
    var exceptionsList =
        document.querySelector('div[contentType=' + type + ']' +
                               ' list[mode=otr]');

    exceptionsList.parentNode.classList.remove('hidden');
    exceptionsList.setExceptions(list);
  };

  /**
   * Sets the initial value for the Third Party Cookies checkbox.
   * @param {boolean=} block True if we are blocking third party cookies.
   */
  ContentSettings.setBlockThirdPartyCookies = function(block) {
    $('block-third-party-cookies').checked = block;
  };

  /**
   * The browser's response to a request to check the validity of a given URL
   * pattern.
   * @param {string} type The content type.
   * @param {string} mode The browser mode.
   * @param {string} pattern The pattern.
   * @param {bool} valid Whether said pattern is valid in the context of
   *     a content exception setting.
   */
  ContentSettings.patternValidityCheckComplete =
      function(type, mode, pattern, valid) {
    var exceptionsList =
        document.querySelector('div[contentType=' + type + '] ' +
                               'list[mode=' + mode + ']');
    exceptionsList.patternValidityCheckComplete(pattern, valid);
  };

  ContentSettings.setClearLocalDataOnShutdownLabel = function(label) {
    $('clear-cookies-on-exit-label').innerText = label;
  };

  // Export
  return {
    ContentSettings: ContentSettings
  };

});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.contentSettings', function() {
  const InlineEditableItemList = options.InlineEditableItemList;
  const InlineEditableItem = options.InlineEditableItem;
  const ArrayDataModel = cr.ui.ArrayDataModel;

  /**
   * Creates a new exceptions list item.
   * @param {string} contentType The type of the list.
   * @param {string} mode The browser mode, 'otr' or 'normal'.
   * @param {boolean} enableAskOption Whether to show an 'ask every time'
   *     option in the select.
   * @param {Object} exception A dictionary that contains the data of the
   *     exception.
   * @constructor
   * @extends {options.InlineEditableItem}
   */
  function ExceptionsListItem(contentType, mode, enableAskOption, exception) {
    var el = cr.doc.createElement('div');
    el.mode = mode;
    el.contentType = contentType;
    el.enableAskOption = enableAskOption;
    el.dataItem = exception;
    el.__proto__ = ExceptionsListItem.prototype;
    el.decorate();

    return el;
  }

  ExceptionsListItem.prototype = {
    __proto__: InlineEditableItem.prototype,

    /**
     * Called when an element is decorated as a list item.
     */
    decorate: function() {
      InlineEditableItem.prototype.decorate.call(this);

      var patternCell = this.createEditableTextCell(this.pattern,
                                                    !this.pattern);
      patternCell.className = 'exception-pattern';
      this.contentElement.appendChild(patternCell);
      if (this.pattern)
        this.patternLabel = patternCell.querySelector('.static-text');
      var input = patternCell.querySelector('input');

      // TODO(stuartmorgan): Create an createEditableSelectCell abstracting
      // this code.
      // Setting label for display mode. |pattern| will be null for the 'add new
      // exception' row.
      if (this.pattern) {
        var settingLabel = cr.doc.createElement('span');
        settingLabel.textContent = this.settingForDisplay();
        settingLabel.className = 'exception-setting';
        settingLabel.setAttribute('displaymode', 'static');
        this.contentElement.appendChild(settingLabel);
        this.settingLabel = settingLabel;
      }

      // Setting select element for edit mode.
      var select = cr.doc.createElement('select');
      var optionAllow = cr.doc.createElement('option');
      optionAllow.textContent = templateData.allowException;
      optionAllow.value = 'allow';
      select.appendChild(optionAllow);

      if (this.enableAskOption) {
        var optionAsk = cr.doc.createElement('option');
        optionAsk.textContent = templateData.askException;
        optionAsk.value = 'ask';
        select.appendChild(optionAsk);
      }

      if (this.contentType == 'cookies') {
        var optionSession = cr.doc.createElement('option');
        optionSession.textContent = templateData.sessionException;
        optionSession.value = 'session';
        select.appendChild(optionSession);
      }

      var optionBlock = cr.doc.createElement('option');
      optionBlock.textContent = templateData.blockException;
      optionBlock.value = 'block';
      select.appendChild(optionBlock);

      this.contentElement.appendChild(select);
      select.className = 'exception-setting';
      if (this.pattern)
        select.setAttribute('displaymode', 'edit');

      // Used to track whether the URL pattern in the input is valid.
      // This will be true if the browser process has informed us that the
      // current text in the input is valid. Changing the text resets this to
      // false, and getting a response from the browser sets it back to true.
      // It starts off as false for empty string (new exceptions) or true for
      // already-existing exceptions (which we assume are valid).
      this.inputValidityKnown = this.pattern;
      // This one tracks the actual validity of the pattern in the input. This
      // starts off as true so as not to annoy the user when he adds a new and
      // empty input.
      this.inputIsValid = true;

      this.input = input;
      this.select = select;

      this.updateEditables();

      // Editing notifications and geolocation is disabled for now.
      if (this.contentType == 'notifications' ||
          this.contentType == 'location') {
        this.editable = false;
      }

      var listItem = this;
      // Handle events on the editable nodes.
      input.oninput = function(event) {
        listItem.inputValidityKnown = false;
        chrome.send('checkExceptionPatternValidity',
                    [listItem.contentType, listItem.mode, input.value]);
      };

      // Listen for edit events.
      this.addEventListener('canceledit', this.onEditCancelled_);
      this.addEventListener('commitedit', this.onEditCommitted_);
    },

    /**
     * The pattern (e.g., a URL) for the exception.
     * @type {string}
     */
    get pattern() {
      return this.dataItem['displayPattern'];
    },
    set pattern(pattern) {
      this.dataItem['displayPattern'] = pattern;
    },

    /**
     * The setting (allow/block) for the exception.
     * @type {string}
     */
    get setting() {
      return this.dataItem['setting'];
    },
    set setting(setting) {
      this.dataItem['setting'] = setting;
    },

    /**
     * Gets a human-readable setting string.
     * @type {string}
     */
    settingForDisplay: function() {
      var setting = this.setting;
      if (setting == 'allow')
        return templateData.allowException;
      else if (setting == 'block')
        return templateData.blockException;
      else if (setting == 'ask')
        return templateData.askException;
      else if (setting == 'session')
        return templateData.sessionException;
    },

    /**
     * Update this list item to reflect whether the input is a valid pattern.
     * @param {boolean} valid Whether said pattern is valid in the context of
     *     a content exception setting.
     */
    setPatternValid: function(valid) {
      if (valid || !this.input.value)
        this.input.setCustomValidity('');
      else
        this.input.setCustomValidity(' ');
      this.inputIsValid = valid;
      this.inputValidityKnown = true;
    },

    /**
     * Set the <input> to its original contents. Used when the user quits
     * editing.
     */
    resetInput: function() {
      this.input.value = this.pattern;
    },

    /**
     * Copy the data model values to the editable nodes.
     */
    updateEditables: function() {
      this.resetInput();

      var settingOption =
          this.select.querySelector('[value=\'' + this.setting + '\']');
      if (settingOption)
        settingOption.selected = true;
    },

    /** @inheritDoc */
    get currentInputIsValid() {
      return this.inputValidityKnown && this.inputIsValid;
    },

    /** @inheritDoc */
    get hasBeenEdited() {
      var livePattern = this.input.value;
      var liveSetting = this.select.value;
      return livePattern != this.pattern || liveSetting != this.setting;
    },

    /**
     * Called when committing an edit.
     * @param {Event} e The end event.
     * @private
     */
    onEditCommitted_: function(e) {
      var newPattern = this.input.value;
      var newSetting = this.select.value;

      this.finishEdit(newPattern, newSetting);
    },

    /**
     * Called when cancelling an edit; resets the control states.
     * @param {Event} e The cancel event.
     * @private
     */
    onEditCancelled_: function() {
      this.updateEditables();
      this.setPatternValid(true);
    },

    /**
     * Editing is complete; update the model.
     * @param {string} newPattern The pattern that the user entered.
     * @param {string} newSetting The setting the user chose.
     */
    finishEdit: function(newPattern, newSetting) {
      this.patternLabel.textContent = newPattern;
      this.settingLabel.textContent = this.settingForDisplay();
      var oldPattern = this.pattern;
      this.pattern = newPattern;
      this.setting = newSetting;

      // TODO(estade): this will need to be updated if geolocation/notifications
      // become editable.
      if (oldPattern != newPattern) {
        chrome.send('removeException',
                    [this.contentType, this.mode, oldPattern]);
      }

      chrome.send('setException',
                  [this.contentType, this.mode, newPattern, newSetting]);
    }
  };

  /**
   * Creates a new list item for the Add New Item row, which doesn't represent
   * an actual entry in the exceptions list but allows the user to add new
   * exceptions.
   * @param {string} contentType The type of the list.
   * @param {string} mode The browser mode, 'otr' or 'normal'.
   * @param {boolean} enableAskOption Whether to show an 'ask every time'
   *     option in the select.
   * @constructor
   * @extends {cr.ui.ExceptionsListItem}
   */
  function ExceptionsAddRowListItem(contentType, mode, enableAskOption) {
    var el = cr.doc.createElement('div');
    el.mode = mode;
    el.contentType = contentType;
    el.enableAskOption = enableAskOption;
    el.dataItem = [];
    el.__proto__ = ExceptionsAddRowListItem.prototype;
    el.decorate();

    return el;
  }

  ExceptionsAddRowListItem.prototype = {
    __proto__: ExceptionsListItem.prototype,

    decorate: function() {
      ExceptionsListItem.prototype.decorate.call(this);

      this.input.placeholder = templateData.addNewExceptionInstructions;

      // Do we always want a default of allow?
      this.setting = 'allow';
    },

    /**
     * Clear the <input> and let the placeholder text show again.
     */
    resetInput: function() {
      this.input.value = '';
    },

    /** @inheritDoc */
    get hasBeenEdited() {
      return this.input.value != '';
    },

    /**
     * Editing is complete; update the model. As long as the pattern isn't
     * empty, we'll just add it.
     * @param {string} newPattern The pattern that the user entered.
     * @param {string} newSetting The setting the user chose.
     */
    finishEdit: function(newPattern, newSetting) {
      chrome.send('setException',
                  [this.contentType, this.mode, newPattern, newSetting]);
    },
  };

  /**
   * Creates a new exceptions list.
   * @constructor
   * @extends {cr.ui.List}
   */
  var ExceptionsList = cr.ui.define('list');

  ExceptionsList.prototype = {
    __proto__: InlineEditableItemList.prototype,

    /**
     * Called when an element is decorated as a list.
     */
    decorate: function() {
      InlineEditableItemList.prototype.decorate.call(this);

      this.classList.add('settings-list');

      for (var parentNode = this.parentNode; parentNode;
           parentNode = parentNode.parentNode) {
        if (parentNode.hasAttribute('contentType')) {
          this.contentType = parentNode.getAttribute('contentType');
          break;
        }
      }

      this.mode = this.getAttribute('mode');

      var exceptionList = this;
      function handleBlur(e) {
        // When the blur event happens we do not know who is getting focus so we
        // delay this a bit until we know if the new focus node is outside the
        // list.
        var doc = e.target.ownerDocument;
        window.setTimeout(function() {
          var activeElement = doc.activeElement;
          if (!exceptionList.contains(activeElement))
            exceptionList.selectionModel.unselectAll();
        }, 50);
      }

      this.addEventListener('blur', handleBlur, true);

      // Whether the exceptions in this list allow an 'Ask every time' option.
      this.enableAskOption = (this.contentType == 'plugins' &&
                              templateData.enable_click_to_play);

      this.autoExpands = true;
      this.reset();
    },

    /**
     * Creates an item to go in the list.
     * @param {Object} entry The element from the data model for this row.
     */
    createItem: function(entry) {
      if (entry) {
        return new ExceptionsListItem(this.contentType,
                                      this.mode,
                                      this.enableAskOption,
                                      entry);
      } else {
        var addRowItem = new ExceptionsAddRowListItem(this.contentType,
                                                      this.mode,
                                                      this.enableAskOption);
        addRowItem.deletable = false;
        return addRowItem;
      }
    },

    /**
     * Sets the exceptions in the js model.
     * @param {Object} entries A list of dictionaries of values, each dictionary
     *     represents an exception.
     */
    setExceptions: function(entries) {
      var deleteCount = this.dataModel.length;

      if (this.isEditable()) {
        // We don't want to remove the Add New Exception row.
        deleteCount = deleteCount - 1;
      }

      var args = [0, deleteCount];
      args.push.apply(args, entries);
      this.dataModel.splice.apply(this.dataModel, args);
    },

    /**
     * The browser has finished checking a pattern for validity. Update the
     * list item to reflect this.
     * @param {string} pattern The pattern.
     * @param {bool} valid Whether said pattern is valid in the context of
     *     a content exception setting.
     */
    patternValidityCheckComplete: function(pattern, valid) {
      var listItems = this.items;
      for (var i = 0; i < listItems.length; i++) {
        var listItem = listItems[i];
        // Don't do anything for messages for the item if it is not the intended
        // recipient, or if the response is stale (i.e. the input value has
        // changed since we sent the request to analyze it).
        if (pattern == listItem.input.value)
          listItem.setPatternValid(valid);
      }
    },

    /**
     * Returns whether the rows are editable in this list.
     */
    isEditable: function() {
      // Editing notifications and geolocation is disabled for now.
      return !(this.contentType == 'notifications' ||
               this.contentType == 'location');
    },

    /**
     * Removes all exceptions from the js model.
     */
    reset: function() {
      if (this.isEditable()) {
        // The null creates the Add New Exception row.
        this.dataModel = new ArrayDataModel([null]);
      } else {
        this.dataModel = new ArrayDataModel([]);
      }
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      var listItem = this.getListItemByIndex(index);
      if (listItem.undeletable)
        return;

      var dataItem = listItem.dataItem;
      var args = [listItem.contentType];
      if (listItem.contentType == 'location')
        args.push(dataItem['origin'], dataItem['embeddingOrigin']);
      else if (listItem.contentType == 'notifications')
        args.push(dataItem['origin'], dataItem['setting']);
      else
        args.push(listItem.mode, listItem.pattern);

      chrome.send('removeException', args);
    },
  };

  var OptionsPage = options.OptionsPage;

  /**
   * Encapsulated handling of content settings list subpage.
   * @constructor
   */
  function ContentSettingsExceptionsArea() {
    OptionsPage.call(this, 'contentExceptions',
                     templateData.contentSettingsPageTabTitle,
                     'content-settings-exceptions-area');
  }

  cr.addSingletonGetter(ContentSettingsExceptionsArea);

  ContentSettingsExceptionsArea.prototype = {
    __proto__: OptionsPage.prototype,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var exceptionsLists = this.pageDiv.querySelectorAll('list');
      for (var i = 0; i < exceptionsLists.length; i++) {
        options.contentSettings.ExceptionsList.decorate(exceptionsLists[i]);
      }

      ContentSettingsExceptionsArea.hideOTRLists();

      // If the user types in the URL without a hash, show just cookies.
      this.showList('cookies');
    },

    /**
     * Shows one list and hides all others.
     * @param {string} type The content type.
     */
    showList: function(type) {
      var header = this.pageDiv.querySelector('h1');
      header.textContent = templateData[type + '_header'];

      var divs = this.pageDiv.querySelectorAll('div[contentType]');
      for (var i = 0; i < divs.length; i++) {
        if (divs[i].getAttribute('contentType') == type)
          divs[i].classList.remove('hidden');
        else
          divs[i].classList.add('hidden');
      }
    },

    /**
     * Called after the page has been shown. Show the content type for the
     * location's hash.
     */
    didShowPage: function() {
      var hash = location.hash;
      if (hash)
        this.showList(hash.slice(1));
    },
  };

  /**
   * Called when the last incognito window is closed.
   */
  ContentSettingsExceptionsArea.OTRProfileDestroyed = function() {
    this.hideOTRLists();
  };

  /**
   * Clears and hides the incognito exceptions lists.
   */
  ContentSettingsExceptionsArea.hideOTRLists = function() {
    var otrLists = document.querySelectorAll('list[mode=otr]');

    for (var i = 0; i < otrLists.length; i++) {
      otrLists[i].reset();
      otrLists[i].parentNode.classList.add('hidden');
    }
  };

  return {
    ExceptionsListItem: ExceptionsListItem,
    ExceptionsAddRowListItem: ExceptionsAddRowListItem,
    ExceptionsList: ExceptionsList,
    ContentSettingsExceptionsArea: ContentSettingsExceptionsArea,
  };
});
/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  //////////////////////////////////////////////////////////////////////////////
  // ContentSettingsRadio class:

  // Define a constructor that uses an input element as its underlying element.
  var ContentSettingsRadio = cr.ui.define('input');

  ContentSettingsRadio.prototype = {
    __proto__: HTMLInputElement.prototype,

    /**
     * Initialization function for the cr.ui framework.
     */
    decorate: function() {
      this.type = 'radio';
      var self = this;

      this.addEventListener('change',
          function(e) {
            chrome.send('setContentFilter', [this.name, this.value]);
          });
    },
  };

  // Export
  return {
    ContentSettingsRadio: ContentSettingsRadio
  };

});

/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const DeletableItemList = options.DeletableItemList;
  const DeletableItem = options.DeletableItem;
  const ArrayDataModel = cr.ui.ArrayDataModel;
  const ListSingleSelectionModel = cr.ui.ListSingleSelectionModel;

  // This structure maps the various cookie type names from C++ (hence the
  // underscores) to arrays of the different types of data each has, along with
  // the i18n name for the description of that data type.
  const cookieInfo = {
    'cookie': [ ['name', 'label_cookie_name'],
                ['content', 'label_cookie_content'],
                ['domain', 'label_cookie_domain'],
                ['path', 'label_cookie_path'],
                ['sendfor', 'label_cookie_send_for'],
                ['accessibleToScript', 'label_cookie_accessible_to_script'],
                ['created', 'label_cookie_created'],
                ['expires', 'label_cookie_expires'] ],
    'app_cache': [ ['manifest', 'label_app_cache_manifest'],
                   ['size', 'label_local_storage_size'],
                   ['created', 'label_cookie_created'],
                   ['accessed', 'label_cookie_last_accessed'] ],
    'database': [ ['name', 'label_cookie_name'],
                  ['desc', 'label_webdb_desc'],
                  ['webdbSize', 'label_local_storage_size'],
                  ['modified', 'label_local_storage_last_modified'] ],
    'local_storage': [ ['origin', 'label_local_storage_origin'],
                       ['size', 'label_local_storage_size'],
                       ['modified', 'label_local_storage_last_modified'] ],
    'indexed_db': [ ['origin', 'label_indexed_db_origin'],
                    ['size', 'label_indexed_db_size'],
                    ['modified', 'label_indexed_db_last_modified'] ],
  };

  const localStrings = new LocalStrings();

  /**
   * Returns the item's height, like offsetHeight but such that it works better
   * when the page is zoomed. See the similar calculation in @{code cr.ui.List}.
   * @param {Element} item The item to get the height of.
   * @return {number} The height of the item, calculated with zooming in mind.
   */
  function getItemHeight(item) {
    return item.getBoundingClientRect().height;
  }

  var parentLookup = {};
  var lookupRequests = {};

  /**
   * Creates a new list item for sites data. Note that these are created and
   * destroyed lazily as they scroll into and out of view, so they must be
   * stateless. We cache the expanded item in @{code CookiesList} though, so it
   * can keep state. (Mostly just which item is selected.)
   * @param {Object} origin Data used to create a cookie list item.
   * @param {CookiesList} list The list that will contain this item.
   * @constructor
   * @extends {DeletableItem}
   */
  function CookieListItem(origin, list) {
    var listItem = new DeletableItem(null);
    listItem.__proto__ = CookieListItem.prototype;

    listItem.origin = origin;
    listItem.list = list;
    listItem.decorate();

    // This hooks up updateOrigin() to the list item, makes the top-level
    // tree nodes (i.e., origins) register their IDs in parentLookup, and
    // causes them to request their children if they have none. Note that we
    // have special logic in the setter for the parent property to make sure
    // that we can still garbage collect list items when they scroll out of
    // view, even though it appears that we keep a direct reference.
    if (origin) {
      origin.parent = listItem;
      origin.updateOrigin();
    }

    return listItem;
  }

  CookieListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /** @inheritDoc */
    decorate: function() {
      this.siteChild = this.ownerDocument.createElement('div');
      this.siteChild.className = 'cookie-site';
      this.dataChild = this.ownerDocument.createElement('div');
      this.dataChild.className = 'cookie-data';
      this.itemsChild = this.ownerDocument.createElement('div');
      this.itemsChild.className = 'cookie-items';
      this.infoChild = this.ownerDocument.createElement('div');
      this.infoChild.className = 'cookie-details hidden';
      var remove = this.ownerDocument.createElement('button');
      remove.textContent = localStrings.getString('remove_cookie');
      remove.onclick = this.removeCookie_.bind(this);
      this.infoChild.appendChild(remove);
      var content = this.contentElement;
      content.appendChild(this.siteChild);
      content.appendChild(this.dataChild);
      content.appendChild(this.itemsChild);
      this.itemsChild.appendChild(this.infoChild);
      if (this.origin && this.origin.data)
        this.siteChild.textContent = this.origin.data.title;
      this.itemList_ = [];
    },

    /** @type {boolean} */
    get expanded() {
      return this.expanded_;
    },
    set expanded(expanded) {
      if (this.expanded_ == expanded)
        return;
      this.expanded_ = expanded;
      if (expanded) {
        this.list.expandedItem = this;
        this.updateItems_();
        this.classList.add('show-items');
      } else {
        if (this.list.expandedItem == this) {
          this.list.leadItemHeight = 0;
          this.list.expandedItem = null;
        }
        this.style.height = '';
        this.itemsChild.style.height = '';
        this.classList.remove('show-items');
      }
    },

    /**
     * The callback for the "remove" button shown when an item is selected.
     * Requests that the currently selected cookie be removed.
     * @private
     */
    removeCookie_: function() {
      if (this.selectedIndex_ >= 0) {
        var item = this.itemList_[this.selectedIndex_];
        if (item && item.node)
          chrome.send('removeCookie', [item.node.pathId]);
      }
    },

    /**
     * Disable animation within this cookie list item, in preparation for making
     * changes that will need to be animated. Makes it possible to measure the
     * contents without displaying them, to set animation targets.
     * @private
     */
    disableAnimation_: function() {
      this.itemsHeight_ = getItemHeight(this.itemsChild);
      this.classList.add('measure-items');
    },

    /**
     * Enable animation after changing the contents of this cookie list item.
     * See @{code disableAnimation_}.
     * @private
     */
    enableAnimation_: function() {
      if (!this.classList.contains('measure-items'))
        this.disableAnimation_();
      this.itemsChild.style.height = '';
      // This will force relayout in order to calculate the new heights.
      var itemsHeight = getItemHeight(this.itemsChild);
      var fixedHeight = getItemHeight(this) + itemsHeight - this.itemsHeight_;
      this.itemsChild.style.height = this.itemsHeight_ + 'px';
      // Force relayout before enabling animation, so that if we have
      // changed things since the last layout, they will not be animated
      // during subsequent layouts.
      this.itemsChild.offsetHeight;
      this.classList.remove('measure-items');
      this.itemsChild.style.height = itemsHeight + 'px';
      this.style.height = fixedHeight + 'px';
      if (this.selected)
        this.list.leadItemHeight = fixedHeight;
    },

    /**
     * Updates the origin summary to reflect changes in its items.
     * Both CookieListItem and CookieTreeNode implement this API.
     * This implementation scans the descendants to update the text.
     */
    updateOrigin: function() {
      var info = {
        cookies: 0,
        database: false,
        localStorage: false,
        appCache: false,
        indexedDb: false
      };
      if (this.origin)
        this.origin.collectSummaryInfo(info);
      var list = [];
      if (info.cookies > 1)
        list.push(localStrings.getStringF('cookie_plural', info.cookies));
      else if (info.cookies > 0)
        list.push(localStrings.getString('cookie_singular'));
      if (info.database || info.indexedDb)
        list.push(localStrings.getString('cookie_database_storage'));
      if (info.localStorage)
        list.push(localStrings.getString('cookie_local_storage'));
      if (info.appCache)
        list.push(localStrings.getString('cookie_session_storage'));
      var text = '';
      for (var i = 0; i < list.length; ++i)
        if (text.length > 0)
          text += ', ' + list[i];
        else
          text = list[i];
      this.dataChild.textContent = text;
      if (this.selected)
        this.updateItems_();
    },

    /**
     * Updates the items section to reflect changes, animating to the new state.
     * Removes existing contents and calls @{code CookieTreeNode.createItems}.
     * @private
     */
    updateItems_: function() {
      this.disableAnimation_();
      this.itemsChild.textContent = '';
      this.infoChild.classList.add('hidden');
      this.selectedIndex_ = -1;
      this.itemList_ = [];
      if (this.origin)
        this.origin.createItems(this);
      this.itemsChild.appendChild(this.infoChild);
      this.enableAnimation_();
    },

    /**
     * Append a new cookie node "bubble" to this list item.
     * @param {CookieTreeNode} node The cookie node to add a bubble for.
     * @param {Element} div The DOM element for the bubble itself.
     * @return {number} The index the bubble was added at.
     */
    appendItem: function(node, div) {
      this.itemList_.push({node: node, div: div});
      this.itemsChild.appendChild(div);
      return this.itemList_.length - 1;
    },

    /**
     * The currently selected cookie node ("cookie bubble") index.
     * @type {number}
     * @private
     */
    selectedIndex_: -1,

    /**
     * Get the currently selected cookie node ("cookie bubble") index.
     * @type {number}
     */
    get selectedIndex() {
      return this.selectedIndex_;
    },

    /**
     * Set the currently selected cookie node ("cookie bubble") index to
     * @{code itemIndex}, unselecting any previously selected node first.
     * @param {number} itemIndex The index to set as the selected index.
     */
    set selectedIndex(itemIndex) {
      if (itemIndex < 0 || itemIndex >= this.itemList_.length)
        return;
      var index = this.list.getIndexOfListItem(this);
      if (this.selectedIndex_ >= 0) {
        var item = this.itemList_[this.selectedIndex_];
        if (item && item.div)
          item.div.removeAttribute('selected');
      }
      this.selectedIndex_ = itemIndex;
      this.itemList_[itemIndex].div.setAttribute('selected', '');
      this.disableAnimation_();
      this.itemList_[itemIndex].node.setDetailText(this.infoChild,
                                                   this.list.infoNodes);
      this.infoChild.classList.remove('hidden');
      this.enableAnimation_();
      // If we're near the bottom of the list this may cause the list item to go
      // beyond the end of the visible area. Fix it after the animation is done.
      var list = this.list;
      window.setTimeout(function() { list.scrollIndexIntoView(index); }, 150);
    },
  };

  /**
   * {@code CookieTreeNode}s mirror the structure of the cookie tree lazily, and
   * contain all the actual data used to generate the {@code CookieListItem}s.
   * @param {Object} data The data object for this node.
   * @constructor
   */
  function CookieTreeNode(data) {
    this.data = data;
    this.children = [];
  }

  CookieTreeNode.prototype = {
    /**
     * Insert a cookie tree node at the given index.
     * Both CookiesList and CookieTreeNode implement this API.
     * @param {Object} data The data object for the node to add.
     * @param {number} index The index at which to insert the node.
     */
    insertAt: function(data, index) {
      var child = new CookieTreeNode(data);
      this.children.splice(index, 0, child);
      child.parent = this;
      this.updateOrigin();
    },

    /**
     * Remove a cookie tree node from the given index.
     * Both CookiesList and CookieTreeNode implement this API.
     * @param {number} index The index of the tree node to remove.
     */
    remove: function(index) {
      if (index < this.children.length) {
        this.children.splice(index, 1);
        this.updateOrigin();
      }
    },

    /**
     * Clears all children.
     * Both CookiesList and CookieTreeNode implement this API.
     * It is used by CookiesList.loadChildren().
     */
    clear: function() {
      // We might leave some garbage in parentLookup for removed children.
      // But that should be OK because parentLookup is cleared when we
      // reload the tree.
      this.children = [];
      this.updateOrigin();
    },

    /**
     * The counter used by startBatchUpdates() and endBatchUpdates().
     * @type {number}
     */
    batchCount_: 0,

    /**
     * See cr.ui.List.startBatchUpdates().
     * Both CookiesList (via List) and CookieTreeNode implement this API.
     */
    startBatchUpdates: function() {
      this.batchCount_++;
    },

    /**
     * See cr.ui.List.endBatchUpdates().
     * Both CookiesList (via List) and CookieTreeNode implement this API.
     */
    endBatchUpdates: function() {
      if (!--this.batchCount_)
        this.updateOrigin();
    },

    /**
     * Requests updating the origin summary to reflect changes in this item.
     * Both CookieListItem and CookieTreeNode implement this API.
     */
    updateOrigin: function() {
      if (!this.batchCount_ && this.parent)
        this.parent.updateOrigin();
    },

    /**
     * Summarize the information in this node and update @{code info}.
     * This will recurse into child nodes to summarize all descendants.
     * @param {Object} info The info object from @{code updateOrigin}.
     */
    collectSummaryInfo: function(info) {
      if (this.children.length > 0) {
        for (var i = 0; i < this.children.length; ++i)
          this.children[i].collectSummaryInfo(info);
      } else if (this.data && !this.data.hasChildren) {
        if (this.data.type == 'cookie')
          info.cookies++;
        else if (this.data.type == 'database')
          info.database = true;
        else if (this.data.type == 'local_storage')
          info.localStorage = true;
        else if (this.data.type == 'app_cache')
          info.appCache = true;
        else if (this.data.type == 'indexed_db')
          info.indexedDb = true;
      }
    },

    /**
     * Create the cookie "bubbles" for this node, recursing into children
     * if there are any. Append the cookie bubbles to @{code item}.
     * @param {CookieListItem} item The cookie list item to create items in.
     */
    createItems: function(item) {
      if (this.children.length > 0) {
        for (var i = 0; i < this.children.length; ++i)
          this.children[i].createItems(item);
      } else if (this.data && !this.data.hasChildren) {
        var text = '';
        switch (this.data.type) {
          case 'cookie':
          case 'database':
            text = this.data.name;
            break;
          case 'local_storage':
            text = localStrings.getString('cookie_local_storage');
            break;
          case 'app_cache':
            text = localStrings.getString('cookie_session_storage');
            break;
          case 'indexed_db':
            text = localStrings.getString('cookie_indexed_db');
            break;
        }
        var div = item.ownerDocument.createElement('div');
        div.className = 'cookie-item';
        // Help out screen readers and such: this is a clickable thing.
        div.setAttribute('role', 'button');
        div.textContent = text;
        var index = item.appendItem(this, div);
        div.onclick = function() { item.selectedIndex = index; };
      }
    },

    /**
     * Set the detail text to be displayed to that of this cookie tree node.
     * Uses preallocated DOM elements for each cookie node type from @{code
     * infoNodes}, and inserts the appropriate elements to @{code element}.
     * @param {Element} element The DOM element to insert elements to.
     * @param {Object.<string, {table: Element, info: Object.<string,
     *     Element>}>} infoNodes The map from cookie node types to maps from
     *     cookie attribute names to DOM elements to display cookie attribute
     *     values, created by @{code CookiesList.decorate}.
     */
    setDetailText: function(element, infoNodes) {
      var table;
      if (this.data && !this.data.hasChildren) {
        if (cookieInfo[this.data.type]) {
          var info = cookieInfo[this.data.type];
          var nodes = infoNodes[this.data.type].info;
          for (var i = 0; i < info.length; ++i) {
            var name = info[i][0];
            if (name != 'id' && this.data[name])
              nodes[name].textContent = this.data[name];
          }
          table = infoNodes[this.data.type].table;
        }
      }
      while (element.childNodes.length > 1)
        element.removeChild(element.firstChild);
      if (table)
        element.insertBefore(table, element.firstChild);
    },

    /**
     * The parent of this cookie tree node.
     * @type {?CookieTreeNode|CookieListItem}
     */
    get parent(parent) {
      // See below for an explanation of this special case.
      if (typeof this.parent_ == 'number')
        return this.list_.getListItemByIndex(this.parent_);
      return this.parent_;
    },
    set parent(parent) {
      if (parent == this.parent)
        return;
      if (parent instanceof CookieListItem) {
        // If the parent is to be a CookieListItem, then we keep the reference
        // to it by its containing list and list index, rather than directly.
        // This allows the list items to be garbage collected when they scroll
        // out of view (except the expanded item, which we cache). This is
        // transparent except in the setter and getter, where we handle it.
        this.parent_ = parent.listIndex;
        this.list_ = parent.list;
        parent.addEventListener('listIndexChange',
                                this.parentIndexChanged_.bind(this));
      } else {
        this.parent_ = parent;
      }
      if (this.data && this.data.id) {
        if (parent)
          parentLookup[this.data.id] = this;
        else
          delete parentLookup[this.data.id];
      }
      if (this.data && this.data.hasChildren &&
          !this.children.length && !lookupRequests[this.data.id]) {
        lookupRequests[this.data.id] = true;
        chrome.send('loadCookie', [this.pathId]);
      }
    },

    /**
     * Called when the parent is a CookieListItem whose index has changed.
     * See the code above that avoids keeping a direct reference to
     * CookieListItem parents, to allow them to be garbage collected.
     * @private
     */
    parentIndexChanged_: function(event) {
      if (typeof this.parent_ == 'number') {
        this.parent_ = event.newValue;
        // We set a timeout to update the origin, rather than doing it right
        // away, because this callback may occur while the list items are
        // being repopulated following a scroll event. Calling updateOrigin()
        // immediately could trigger relayout that would reset the scroll
        // position within the list, among other things.
        window.setTimeout(this.updateOrigin.bind(this), 0);
      }
    },

    /**
     * The cookie tree path id.
     * @type {string}
     */
    get pathId() {
      var parent = this.parent;
      if (parent && parent instanceof CookieTreeNode)
        return parent.pathId + ',' + this.data.id;
      return this.data.id;
    },
  };

  /**
   * Creates a new cookies list.
   * @param {Object=} opt_propertyBag Optional properties.
   * @constructor
   * @extends {DeletableItemList}
   */
  var CookiesList = cr.ui.define('list');

  CookiesList.prototype = {
    __proto__: DeletableItemList.prototype,

    /** @inheritDoc */
    decorate: function() {
      DeletableItemList.prototype.decorate.call(this);
      this.classList.add('cookie-list');
      this.data_ = [];
      this.dataModel = new ArrayDataModel(this.data_);
      this.addEventListener('keydown', this.handleKeyLeftRight_.bind(this));
      var sm = new ListSingleSelectionModel();
      sm.addEventListener('change', this.cookieSelectionChange_.bind(this));
      sm.addEventListener('leadIndexChange', this.cookieLeadChange_.bind(this));
      this.selectionModel = sm;
      this.infoNodes = {};
      var doc = this.ownerDocument;
      // Create a table for each type of site data (e.g. cookies, databases,
      // etc.) and save it so that we can reuse it for all origins.
      for (var type in cookieInfo) {
        var table = doc.createElement('table');
        table.className = 'cookie-details-table';
        var tbody = doc.createElement('tbody');
        table.appendChild(tbody);
        var info = {};
        for (var i = 0; i < cookieInfo[type].length; i++) {
          var tr = doc.createElement('tr');
          var name = doc.createElement('td');
          var data = doc.createElement('td');
          var pair = cookieInfo[type][i];
          name.className = 'cookie-details-label';
          name.textContent = localStrings.getString(pair[1]);
          data.className = 'cookie-details-value';
          data.textContent = '';
          tr.appendChild(name);
          tr.appendChild(data);
          tbody.appendChild(tr);
          info[pair[0]] = data;
        }
        this.infoNodes[type] = {table: table, info: info};
      }
    },

    /**
     * Handles key down events and looks for left and right arrows, then
     * dispatches to the currently expanded item, if any.
     * @param {Event} e The keydown event.
     * @private
     */
    handleKeyLeftRight_: function(e) {
      var id = e.keyIdentifier;
      if ((id == 'Left' || id == 'Right') && this.expandedItem) {
        var cs = this.ownerDocument.defaultView.getComputedStyle(this);
        var rtl = cs.direction == 'rtl';
        if ((!rtl && id == 'Left') || (rtl && id == 'Right'))
          this.expandedItem.selectedIndex--;
        else
          this.expandedItem.selectedIndex++;
        this.scrollIndexIntoView(this.expandedItem.listIndex);
        // Prevent the page itself from scrolling.
        e.preventDefault();
      }
    },

    /**
     * Called on selection model selection changes.
     * @param {Event} ce The selection change event.
     * @private
     */
    cookieSelectionChange_: function(ce) {
      ce.changes.forEach(function(change) {
          var listItem = this.getListItemByIndex(change.index);
          if (listItem) {
            if (!change.selected)
              listItem.expanded = false;
            else if (listItem.lead)
              listItem.expanded = true;
          }
        }, this);
    },

    /**
     * Called on selection model lead changes.
     * @param {Event} pe The lead change event.
     * @private
     */
    cookieLeadChange_: function(pe) {
      if (pe.oldValue != -1) {
        var listItem = this.getListItemByIndex(pe.oldValue);
        if (listItem)
          listItem.expanded = false;
      }
      if (pe.newValue != -1) {
        var listItem = this.getListItemByIndex(pe.newValue);
        if (listItem && listItem.selected)
          listItem.expanded = true;
      }
    },

    /**
     * The currently expanded item. Used by CookieListItem above.
     * @type {?CookieListItem}
     */
    expandedItem: null,

    // from cr.ui.List
    /** @inheritDoc */
    createItem: function(data) {
      // We use the cached expanded item in order to allow it to maintain some
      // state (like its fixed height, and which bubble is selected).
      if (this.expandedItem && this.expandedItem.origin == data)
        return this.expandedItem;
      return new CookieListItem(data, this);
    },

    // from options.DeletableItemList
    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      var item = this.data_[index];
      if (item) {
        var pathId = item.pathId;
        if (pathId)
          chrome.send('removeCookie', [pathId]);
      }
    },

    /**
     * Insert a cookie tree node at the given index.
     * Both CookiesList and CookieTreeNode implement this API.
     * @param {Object} data The data object for the node to add.
     * @param {number} index The index at which to insert the node.
     */
    insertAt: function(data, index) {
      this.dataModel.splice(index, 0, new CookieTreeNode(data));
    },

    /**
     * Remove a cookie tree node from the given index.
     * Both CookiesList and CookieTreeNode implement this API.
     * @param {number} index The index of the tree node to remove.
     */
    remove: function(index) {
      if (index < this.data_.length)
        this.dataModel.splice(index, 1);
    },

    /**
     * Clears the list.
     * Both CookiesList and CookieTreeNode implement this API.
     * It is used by CookiesList.loadChildren().
     */
    clear: function() {
      parentLookup = {};
      this.data_ = [];
      this.dataModel = new ArrayDataModel(this.data_);
      this.redraw();
    },

    /**
     * Add tree nodes by given parent.
     * Note: this method will be O(n^2) in the general case. Use it only to
     * populate an empty parent or to insert single nodes to avoid this.
     * @param {Object} parent The parent node.
     * @param {number} start Start index of where to insert nodes.
     * @param {Array} nodesData Nodes data array.
     * @private
     */
    addByParent_: function(parent, start, nodesData) {
      if (!parent)
        return;

      parent.startBatchUpdates();
      for (var i = 0; i < nodesData.length; ++i)
        parent.insertAt(nodesData[i], start + i);
      parent.endBatchUpdates();

      cr.dispatchSimpleEvent(this, 'change');
    },

    /**
     * Add tree nodes by parent id.
     * This is used by cookies_view.js.
     * Note: this method will be O(n^2) in the general case. Use it only to
     * populate an empty parent or to insert single nodes to avoid this.
     * @param {string} parentId Id of the parent node.
     * @param {number} start Start index of where to insert nodes.
     * @param {Array} nodesData Nodes data array.
     */
    addByParentId: function(parentId, start, nodesData) {
      var parent = parentId ? parentLookup[parentId] : this;
      this.addByParent_(parent, start, nodesData);
    },

    /**
     * Removes tree nodes by parent id.
     * This is used by cookies_view.js.
     * @param {string} parentId Id of the parent node.
     * @param {number} start Start index of nodes to remove.
     * @param {number} count Number of nodes to remove.
     */
    removeByParentId: function(parentId, start, count) {
      var parent = parentId ? parentLookup[parentId] : this;
      if (!parent)
        return;

      parent.startBatchUpdates();
      while (count-- > 0)
        parent.remove(start);
      parent.endBatchUpdates();

      cr.dispatchSimpleEvent(this, 'change');
    },

    /**
     * Loads the immediate children of given parent node.
     * This is used by cookies_view.js.
     * @param {string} parentId Id of the parent node.
     * @param {Array} children The immediate children of parent node.
     */
    loadChildren: function(parentId, children) {
      if (parentId)
        delete lookupRequests[parentId];
      var parent = parentId ? parentLookup[parentId] : this;
      if (!parent)
        return;

      parent.startBatchUpdates();
      parent.clear();
      this.addByParent_(parent, 0, children);
      parent.endBatchUpdates();
    },
  };

  return {
    CookiesList: CookiesList
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  /////////////////////////////////////////////////////////////////////////////
  // CookiesView class:

  /**
   * Encapsulated handling of the cookies and other site data page.
   * @constructor
   */
  function CookiesView(model) {
    OptionsPage.call(this, 'cookies',
                     templateData.cookiesViewPageTabTitle,
                     'cookiesViewPage');
  }

  cr.addSingletonGetter(CookiesView);

  CookiesView.prototype = {
    __proto__: OptionsPage.prototype,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      $('cookies-search-box').addEventListener('search',
          this.handleSearchQueryChange_.bind(this));

      $('remove-all-cookies-button').onclick = function(e) {
        chrome.send('removeAllCookies', []);
      };

      var cookiesList = $('cookies-list');
      options.CookiesList.decorate(cookiesList);

      this.addEventListener('visibleChange', this.handleVisibleChange_);
    },

    lastQuery_ : null,

    /**
     * Search cookie using text in cookiesSearchBox.
     */
    searchCookie: function() {
      this.queryDelayTimerId_ = 0;
      var filter = $('cookies-search-box').value;
      if (this.lastQuery_ != filter) {
        this.lastQuery_ = filter;
        chrome.send('updateCookieSearchResults', [filter]);
      }
    },

    queryDelayTimerId_: 0,

    /**
     * Handles search query changes.
     * @private
     * @param {!Event} e The event object.
     */
    handleSearchQueryChange_: function(e) {
      if (this.queryDelayTimerId_) {
        window.clearTimeout(this.queryDelayTimerId_);
      }

      this.queryDelayTimerId_ = window.setTimeout(
          this.searchCookie.bind(this), 500);
    },

    initialized_: false,

    /**
     * Handler for OptionsPage's visible property change event.
     * @private
     * @param {Event} e Property change event.
     */
    handleVisibleChange_: function(e) {
      if (!this.initialized_ && this.visible) {
        this.initialized_ = true;
        this.searchCookie();
      }
    },
  };

  // CookiesViewHandler callbacks.
  CookiesView.onTreeItemAdded = function(args) {
    $('cookies-list').addByParentId(args[0], args[1], args[2]);
  };

  CookiesView.onTreeItemRemoved = function(args) {
    $('cookies-list').removeByParentId(args[0], args[1], args[2]);
  };

  CookiesView.loadChildren = function(args) {
    $('cookies-list').loadChildren(args[0], args[1]);
  };

  // Export
  return {
    CookiesView: CookiesView
  };

});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  /**
   * FontSettings class
   * Encapsulated handling of the 'Fonts and Encoding' page.
   * @class
   */
  function FontSettings() {
    OptionsPage.call(this,
                     'fonts',
                     templateData.fontSettingsPageTabTitle,
                     'font-settings');
  }

  cr.addSingletonGetter(FontSettings);

  FontSettings.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var standardFontRange = $('standard-font-size');
      standardFontRange.valueMap = $('fixed-font-size').valueMap = [9, 10, 11,
          12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40,
          44, 48, 56, 64, 72];
      standardFontRange.continuous = false;
      standardFontRange.fontSampleEl = $('standard-font-sample');
      standardFontRange.notifyChange = this.rangeChanged_.bind(this);

      var minimumFontRange = $('minimum-font-size');
      minimumFontRange.valueMap = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
          18, 20, 22, 24];
      minimumFontRange.continuous = false;
      minimumFontRange.fontSampleEl = $('minimum-font-sample');
      minimumFontRange.notifyChange = this.rangeChanged_.bind(this);
      minimumFontRange.notifyPrefChange =
          this.minimumFontSizeChanged_.bind(this);

      var placeholder = localStrings.getString('fontSettingsPlaceholder');
      $('standard-font-family').appendChild(new Option(placeholder));
      $('fixed-font-family').appendChild(new Option(placeholder));
      $('font-encoding').appendChild(new Option(placeholder));
    },

    /**
     * Called by the options page when this page has been shown.
     */
    didShowPage: function() {
      // The fonts list may be large so we only load it when this page is
      // loaded for the first time.  This makes opening the options window
      // faster and consume less memory if the user never opens the fonts
      // dialog.
      if (!this.hasShown) {
        chrome.send('fetchFontsData');
        this.hasShown = true;
      }
    },

    /**
     * Called as the user changes a non-continuous slider.  This allows for
     * reflecting the change in the UI before the preference has been changed.
     * @param {Element} el The slider input element.
     * @param {number} value The mapped value currently set by the slider.
     * @private
     */
    rangeChanged_: function(el, value) {
      this.setupFontSample_(el.fontSampleEl, value,
                            el.fontSampleEl.style.fontFamily);
    },

    /**
     * Sets the 'minimum_logical_font_size' preference when the minimum font
     * size has been changed by the user.
     * @param {Element} el The slider input element.
     * @param {number} value The mapped value that has been saved.
     * @private
     */
    minimumFontSizeChanged_: function(el, value) {
      Preferences.setIntegerPref('webkit.webprefs.minimum_logical_font_size',
          value, '');
    },

    /**
     * Sets the text, font size and font family of the sample text.
     * @param {Element} el The div containing the sample text.
     * @param {number} size The font size of the sample text.
     * @param {string} font The font family of the sample text.
     * @private
     */
    setupFontSample_: function(el, size, font) {
      el.textContent =
          size + ": " + localStrings.getString('fontSettingsLoremIpsum');
      el.style.fontSize = size + "px";
      if (font)
        el.style.fontFamily = font;
    },

    /**
     * Populates a select list and selects the specified item.
     * @param {Element} element The select element to populate.
     * @param {Array} items The array of items from which to populate.
     * @param {string} selectedValue The selected item.
     * @private
     */
    populateSelect_: function(element, items, selectedValue) {
      // Remove any existing content.
      element.textContent = '';

      // Insert new child nodes into select element.
      var value, text, selected, option;
      for (var i = 0; i < items.length; i++) {
        value = items[i][0];
        text = items[i][1];
        if (text) {
          selected = value == selectedValue;
          element.appendChild(new Option(text, value, false, selected));
        } else {
          element.appendChild(document.createElement('hr'));
        }
      }

      // Enable if not a managed pref.
      if (!element.managed)
        element.disabled = false;
    }
  };

  // Chrome callbacks
  FontSettings.setFontsData = function(fonts, encodings, selectedValues) {
    FontSettings.getInstance().populateSelect_($('standard-font-family'), fonts,
                                               selectedValues[0]);
    FontSettings.getInstance().populateSelect_($('fixed-font-family'), fonts,
                                               selectedValues[1]);
    FontSettings.getInstance().populateSelect_($('font-encoding'), encodings,
                                               selectedValues[2]);
  };

  FontSettings.setupStandardFontSample = function(font, size) {
    FontSettings.getInstance().setupFontSample_($('standard-font-sample'), size,
                                                font);
  };

  FontSettings.setupFixedFontSample = function(font, size) {
    FontSettings.getInstance().setupFontSample_($('fixed-font-sample'), size,
                                                font);
  };

  FontSettings.setupMinimumFontSample = function(size) {
    FontSettings.getInstance().setupFontSample_($('minimum-font-sample'), size);
  };

  // Export
  return {
    FontSettings: FontSettings
  };
});

/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  var OptionsPage = options.OptionsPage;

  /**
   * ImportDataOverlay class
   * Encapsulated handling of the 'Import Data' overlay page.
   * @class
   */
  function ImportDataOverlay() {
    OptionsPage.call(this,
                     'importData',
                     templateData.importDataOverlayTabTitle,
                     'import-data-overlay');
  }

  cr.addSingletonGetter(ImportDataOverlay);

  ImportDataOverlay.prototype = {
    // Inherit from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      var checkboxes =
          document.querySelectorAll('#import-checkboxes input[type=checkbox]');
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].onchange = function() {
          self.validateCommitButton_();
        };
      }

      $('import-browsers').onchange = function() {
        self.updateCheckboxes_();
        self.validateCommitButton_();
      };

      $('import-data-commit').onclick = function() {
        chrome.send('importData', [
            String($('import-browsers').selectedIndex),
            String($('import-history').checked),
            String($('import-favorites').checked),
            String($('import-passwords').checked),
            String($('import-search').checked)]);
      };

      $('import-data-cancel').onclick = function() {
        ImportDataOverlay.dismiss();
      };

      // Form controls are disabled until the profile list has been loaded.
      self.setControlsSensitive_(false);
    },

    /**
     * Set enabled and checked state of the commit button.
     * @private
     */
    validateCommitButton_: function() {
      var somethingToImport =
          $('import-history').checked || $('import-favorites').checked ||
          $('import-passwords').checked || $('import-search').checked;
      $('import-data-commit').disabled = !somethingToImport;
    },

    /**
     * Sets the sensitivity of all the checkboxes and the commit button.
     * @private
     */
    setControlsSensitive_: function(sensitive) {
      var checkboxes =
          document.querySelectorAll('#import-checkboxes input[type=checkbox]');
      for (var i = 0; i < checkboxes.length; i++)
        this.setUpCheckboxState_(checkboxes[i], sensitive);
      $('import-data-commit').disabled = !sensitive;
    },

    /**
     * Set enabled and checked states a checkbox element.
     * @param {Object} checkbox A checkbox element.
     * @param {boolean} enabled The enabled state of the chekbox.
     * @private
     */
    setUpCheckboxState_: function(checkbox, enabled) {
      checkbox.disabled = !enabled;
      checkbox.checked = enabled;
    },

    /**
     * Update the enabled and checked states of all checkboxes.
     * @private
     */
    updateCheckboxes_: function() {
      var index = $('import-browsers').selectedIndex;
      var browserProfile = ImportDataOverlay.browserProfiles[index];
      var importOptions = ['history', 'favorites', 'passwords', 'search'];
      for (var i = 0; i < importOptions.length; i++) {
        var checkbox = $('import-' + importOptions[i]);
        this.setUpCheckboxState_(checkbox, browserProfile[importOptions[i]]);
      }
    },

    /**
     * Update the supported browsers popup with given entries.
     * @param {array} browsers List of supported browsers name.
     * @private
     */
    updateSupportedBrowsers_: function(browsers) {
      ImportDataOverlay.browserProfiles = browsers;
      var browserSelect = $('import-browsers');
      browserSelect.remove(0);  // Remove the 'Loading...' option.
      browserSelect.textContent = '';
      var browserCount = browsers.length;

      if (browserCount == 0) {
        var option = new Option(templateData.noProfileFound, 0);
        browserSelect.appendChild(option);

        this.setControlsSensitive_(false);
      } else {
        this.setControlsSensitive_(true);
        for (var i = 0; i < browserCount; i++) {
          var browser = browsers[i]
          var option = new Option(browser['name'], browser['index']);
          browserSelect.appendChild(option);
        }

        this.updateCheckboxes_();
        this.validateCommitButton_();
      }
    },
  };

  /**
   * Update the supported browsers popup with given entries.
   * @param {array} list of supported browsers name.
   */
  ImportDataOverlay.updateSupportedBrowsers = function(browsers) {
    ImportDataOverlay.getInstance().updateSupportedBrowsers_(browsers);
  };

  /**
   * Update the UI to reflect whether an import operation is in progress.
   * @param {boolean} state True if an import operation is in progress.
   */
  ImportDataOverlay.setImportingState = function(state) {
    if (state) {
      var checkboxes =
          document.querySelectorAll('#import-checkboxes input[type=checkbox]');
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].disabled = true;
      }
    } else {
      ImportDataOverlay.getInstance().updateCheckboxes_();
    }
    $('import-browsers').disabled = state;
    $('import-data-commit').disabled = state;
    $('import-throbber').style.visibility = state ? "visible" : "hidden";
  };

  /**
   * Remove the import overlay from display.
   */
  ImportDataOverlay.dismiss = function() {
    ImportDataOverlay.setImportingState(false);
    OptionsPage.closeOverlay();
  };

  // Export
  return {
    ImportDataOverlay: ImportDataOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  var OptionsPage = options.OptionsPage;

  function InstantConfirmOverlay() {
    OptionsPage.call(this, 'instantConfirm',
                     templateData.instantConfirmTitle,
                     'instantConfirmOverlay');
  };

  cr.addSingletonGetter(InstantConfirmOverlay);

  InstantConfirmOverlay.prototype = {
    // Inherit from OptionsPage.
    __proto__: OptionsPage.prototype,

    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      $('instantConfirmCancel').onclick = function() {
        OptionsPage.closeOverlay();
      };
      $('instantConfirmOk').onclick = function() {
        OptionsPage.closeOverlay();
        Preferences.setBooleanPref('instant.confirm_dialog_shown', true);
        var instantEnabledCheckbox = $('instantEnableCheckbox');
        Preferences.setBooleanPref(instantEnableCheckbox.pref, true,
                                   instantEnableCheckbox.metric);
      };
    },
  };

  // Export
  return {
    InstantConfirmOverlay: InstantConfirmOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

///////////////////////////////////////////////////////////////////////////////
// AddLanguageOverlay class:

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  /**
   * Encapsulated handling of ChromeOS add language overlay page.
   * @constructor
   */
  function AddLanguageOverlay() {
    OptionsPage.call(this, 'addLanguage',
                     localStrings.getString('add_button'),
                     'add-language-overlay-page');
  }

  cr.addSingletonGetter(AddLanguageOverlay);

  AddLanguageOverlay.prototype = {
    // Inherit AddLanguageOverlay from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Initializes AddLanguageOverlay page.
     * Calls base class implementation to starts preference initialization.
     */
    initializePage: function() {
      // Call base class implementation to starts preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      // Set up the cancel button.
      $('add-language-overlay-cancel-button').onclick = function(e) {
        OptionsPage.closeOverlay();
      };

      // Create the language list with which users can add a language.
      var addLanguageList = $('add-language-overlay-language-list');
      var languageListData = templateData.languageList;
      for (var i = 0; i < languageListData.length; i++) {
        var language = languageListData[i];
        var displayText = language.displayName;
        // If the native name is different, add it.
        if (language.displayName != language.nativeDisplayName) {
          displayText += ' - ' + language.nativeDisplayName;
        }
        if (cr.isChromeOS) {
          var button = document.createElement('button');
          button.className = 'link-button';
          button.textContent = displayText;
          button.languageCode = language.code;
          var li = document.createElement('li');
          li.languageCode = language.code;
          li.appendChild(button);
          addLanguageList.appendChild(li);
        } else {
          var option = document.createElement('option');
          option.value = language.code;
          option.textContent = displayText;
          addLanguageList.appendChild(option);
        }
      }
    },
  };

  return {
    AddLanguageOverlay: AddLanguageOverlay
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const ArrayDataModel = cr.ui.ArrayDataModel;
  const LanguageOptions = options.LanguageOptions;
  const List = cr.ui.List;
  const ListItem = cr.ui.ListItem;
  const ListSingleSelectionModel = cr.ui.ListSingleSelectionModel;

  /**
   * Creates a new language list.
   * @param {Object=} opt_propertyBag Optional properties.
   * @constructor
   * @extends {cr.ui.List}
   */
  var LanguageList = cr.ui.define('list');

  /**
   * Gets display name from the given language code.
   * @param {string} languageCode Language code (ex. "fr").
   */
  LanguageList.getDisplayNameFromLanguageCode = function(languageCode) {
    // Build the language code to display name dictionary at first time.
    if (!this.languageCodeToDisplayName_) {
      this.languageCodeToDisplayName_ = {};
      var languageList = templateData.languageList;
      for (var i = 0; i < languageList.length; i++) {
        var language = languageList[i];
        this.languageCodeToDisplayName_[language.code] = language.displayName;
      }
    }

    return this.languageCodeToDisplayName_[languageCode];
  }

  /**
   * Gets native display name from the given language code.
   * @param {string} languageCode Language code (ex. "fr").
   */
  LanguageList.getNativeDisplayNameFromLanguageCode = function(languageCode) {
    // Build the language code to display name dictionary at first time.
    if (!this.languageCodeToNativeDisplayName_) {
      this.languageCodeToNativeDisplayName_ = {};
      var languageList = templateData.languageList;
      for (var i = 0; i < languageList.length; i++) {
        var language = languageList[i];
        this.languageCodeToNativeDisplayName_[language.code] =
            language.nativeDisplayName;
      }
    }

    return this.languageCodeToNativeDisplayName_[languageCode];
  }

  /**
   * Returns true if the given language code is valid.
   * @param {string} languageCode Language code (ex. "fr").
   */
  LanguageList.isValidLanguageCode = function(languageCode) {
    // Having the display name for the language code means that the
    // language code is valid.
    if (LanguageList.getDisplayNameFromLanguageCode(languageCode)) {
      return true;
    }
    return false;
  }

  LanguageList.prototype = {
    __proto__: List.prototype,

    // The list item being dragged.
    draggedItem: null,
    // The drop position information: "below" or "above".
    dropPos: null,
    // The preference is a CSV string that describes preferred languages
    // in Chrome OS. The language list is used for showing the language
    // list in "Language and Input" options page.
    preferredLanguagesPref: 'settings.language.preferred_languages',
    // The preference is a CSV string that describes accept languages used
    // for content negotiation. To be more precise, the list will be used
    // in "Accept-Language" header in HTTP requests.
    acceptLanguagesPref: 'intl.accept_languages',

    /** @inheritDoc */
    decorate: function() {
      List.prototype.decorate.call(this);
      this.selectionModel = new ListSingleSelectionModel;

      // HACK(arv): http://crbug.com/40902
      window.addEventListener('resize', this.redraw.bind(this));

      // Listen to pref change.
      if (cr.isChromeOS) {
        Preferences.getInstance().addEventListener(this.preferredLanguagesPref,
            this.handlePreferredLanguagesPrefChange_.bind(this));
      } else {
        Preferences.getInstance().addEventListener(this.acceptLanguagesPref,
            this.handleAcceptLanguagesPrefChange_.bind(this));
      }

      // Listen to drag and drop events.
      this.addEventListener('dragstart', this.handleDragStart_.bind(this));
      this.addEventListener('dragenter', this.handleDragEnter_.bind(this));
      this.addEventListener('dragover', this.handleDragOver_.bind(this));
      this.addEventListener('drop', this.handleDrop_.bind(this));
    },

    createItem: function(languageCode) {
      var languageDisplayName =
          LanguageList.getDisplayNameFromLanguageCode(languageCode);
      var languageNativeDisplayName =
          LanguageList.getNativeDisplayNameFromLanguageCode(languageCode);
      return new ListItem({
        label: languageDisplayName,
        draggable: true,
        languageCode: languageCode,
        title: languageNativeDisplayName  // Show native name as tooltip.
      });
    },

    /*
     * Adds a language to the language list.
     * @param {string} languageCode language code (ex. "fr").
     */
    addLanguage: function(languageCode) {
      // It shouldn't happen but ignore the language code if it's
      // null/undefined, or already present.
      if (!languageCode || this.dataModel.indexOf(languageCode) >= 0) {
        return;
      }
      this.dataModel.push(languageCode);
      // Select the last item, which is the language added.
      this.selectionModel.selectedIndex = this.dataModel.length - 1;

      this.savePreference_();
    },

    /*
     * Gets the language codes of the currently listed languages.
     */
    getLanguageCodes: function() {
      return this.dataModel.slice();
    },

    /*
     * Gets the language code of the selected language.
     */
    getSelectedLanguageCode: function() {
      return this.selectedItem;
    },

    /*
     * Selects the language by the given language code.
     * @returns {boolean} True if the operation is successful.
     */
    selectLanguageByCode: function(languageCode) {
      var index = this.dataModel.indexOf(languageCode);
      if (index >= 0) {
        this.selectionModel.selectedIndex = index;
        return true;
      }
      return false;
    },

    /*
     * Removes the currently selected language.
     */
    removeSelectedLanguage: function() {
      if (this.selectionModel.selectedIndex >= 0) {
        this.dataModel.splice(this.selectionModel.selectedIndex, 1);
        // Once the selected item is removed, there will be no selected item.
        // Select the item pointed by the lead index.
        this.selectionModel.selectedIndex = this.selectionModel.leadIndex;
        this.savePreference_();
      }
    },

    /*
     * Handles the dragstart event.
     * @param {Event} e The dragstart event.
     * @private
     */
    handleDragStart_: function(e) {
      var target = e.target;
      // ListItem should be the only draggable element type in the page,
      // but just in case.
      if (target instanceof ListItem) {
        this.draggedItem = target;
        e.dataTransfer.effectAllowed = 'move';
        // We need to put some kind of data in the drag or it will be
        // ignored.  Use the display name in case the user drags to a text
        // field or the desktop.
        e.dataTransfer.setData('text/plain', target.title);
      }
    },

    /*
     * Handles the dragenter event.
     * @param {Event} e The dragenter event.
     * @private
     */
    handleDragEnter_: function(e) {
      e.preventDefault();
    },

    /*
     * Handles the dragover event.
     * @param {Event} e The dragover event.
     * @private
     */
    handleDragOver_: function(e) {
      var dropTarget = e.target;
      // Determins whether the drop target is to accept the drop.
      // The drop is only successful on another ListItem.
      if (!(dropTarget instanceof ListItem) ||
          dropTarget == this.draggedItem) {
        return;
      }
      // Compute the drop postion. Should we move the dragged item to
      // below or above the drop target?
      var rect = dropTarget.getBoundingClientRect();
      var dy = e.clientY - rect.top;
      var yRatio = dy / rect.height;
      var dropPos = yRatio <= .5 ? 'above' : 'below';
      this.dropPos = dropPos;
      e.preventDefault();
      // TODO(satorux): Show the drop marker just like the bookmark manager.
    },

    /*
     * Handles the drop event.
     * @param {Event} e The drop event.
     * @private
     */
    handleDrop_: function(e) {
      var dropTarget = e.target;

      // Delete the language from the original position.
      var languageCode = this.draggedItem.languageCode;
      var originalIndex = this.dataModel.indexOf(languageCode);
      this.dataModel.splice(originalIndex, 1);
      // Insert the language to the new position.
      var newIndex = this.dataModel.indexOf(dropTarget.languageCode);
      if (this.dropPos == 'below')
        newIndex += 1;
      this.dataModel.splice(newIndex, 0, languageCode);
      // The cursor should move to the moved item.
      this.selectionModel.selectedIndex = newIndex;
      // Save the preference.
      this.savePreference_();
    },

    /**
     * Handles preferred languages pref change.
     * @param {Event} e The change event object.
     * @private
     */
    handlePreferredLanguagesPrefChange_: function(e) {
      var languageCodesInCsv = e.value.value;
      var languageCodes = this.filterBadLanguageCodes_(
          languageCodesInCsv.split(','));
      this.load_(languageCodes);
    },

    /**
     * Handles accept languages pref change.
     * @param {Event} e The change event object.
     * @private
     */
    handleAcceptLanguagesPrefChange_: function(e) {
      var languageCodesInCsv = e.value.value;
      var languageCodes = this.filterBadLanguageCodes_(
          languageCodesInCsv.split(','));
      this.load_(languageCodes);
    },

    /**
     * Loads given language list.
     * @param {Array} languageCodes List of language codes.
     * @private
     */
    load_: function(languageCodes) {
      // Preserve the original selected index. See comments below.
      var originalSelectedIndex = (this.selectionModel ?
                                   this.selectionModel.selectedIndex : -1);
      this.dataModel = new ArrayDataModel(languageCodes);
      if (originalSelectedIndex >= 0 &&
          originalSelectedIndex < this.dataModel.length) {
        // Restore the original selected index if the selected index is
        // valid after the data model is loaded. This is neeeded to keep
        // the selected language after the languge is added or removed.
        this.selectionModel.selectedIndex = originalSelectedIndex;
        // The lead index should be updated too.
        this.selectionModel.leadIndex = originalSelectedIndex;
      } else if (this.dataModel.length > 0){
        // Otherwise, select the first item if it's not empty.
        // Note that ListSingleSelectionModel won't select an item
        // automatically, hence we manually select the first item here.
        this.selectionModel.selectedIndex = 0;
      }
    },

    /**
     * Saves the preference.
     */
    savePreference_: function() {
      // Encode the language codes into a CSV string.
      if (cr.isChromeOS)
        Preferences.setStringPref(this.preferredLanguagesPref,
                                  this.dataModel.slice().join(','));
      // Save the same language list as accept languages preference as
      // well, but we need to expand the language list, to make it more
      // acceptable. For instance, some web sites don't understand 'en-US'
      // but 'en'. See crosbug.com/9884.
      var acceptLanguages = this.expandLanguageCodes(this.dataModel.slice());
      Preferences.setStringPref(this.acceptLanguagesPref,
                                acceptLanguages.join(','));
      cr.dispatchSimpleEvent(this, 'save');
    },

    /**
     * Expands language codes to make these more suitable for Accept-Language.
     * Example: ['en-US', 'ja', 'en-CA'] => ['en-US', 'en', 'ja', 'en-CA'].
     * 'en' won't appear twice as this function eliminates duplicates.
     * @param {Array} languageCodes List of language codes.
     * @private
     */
    expandLanguageCodes: function(languageCodes) {
      var expandedLanguageCodes = [];
      var seen = {};  // Used to eliminiate duplicates.
      for (var i = 0; i < languageCodes.length; i++) {
        var languageCode = languageCodes[i];
        if (!(languageCode in seen)) {
          expandedLanguageCodes.push(languageCode);
          seen[languageCode] = true;
        }
        var parts = languageCode.split('-');
        if (!(parts[0] in seen)) {
          expandedLanguageCodes.push(parts[0]);
          seen[parts[0]] = true;
        }
      }
      return expandedLanguageCodes;
    },

    /**
     * Filters bad language codes in case bad language codes are
     * stored in the preference. Removes duplicates as well.
     * @param {Array} languageCodes List of language codes.
     * @private
     */
    filterBadLanguageCodes_: function(languageCodes) {
      var filteredLanguageCodes = [];
      var seen = {};
      for (var i = 0; i < languageCodes.length; i++) {
        // Check if the the language code is valid, and not
        // duplicate. Otherwise, skip it.
        if (LanguageList.isValidLanguageCode(languageCodes[i]) &&
            !(languageCodes[i] in seen)) {
          filteredLanguageCodes.push(languageCodes[i]);
          seen[languageCodes[i]] = true;
        }
      }
      return filteredLanguageCodes;
    },
  };

  return {
    LanguageList: LanguageList
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// TODO(kochi): Generalize the notification as a component and put it
// in js/cr/ui/notification.js .

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const LanguageList = options.LanguageList;

  // Some input methods like Chinese Pinyin have config pages.
  // This is the map of the input method names to their config page names.
  const INPUT_METHOD_ID_TO_CONFIG_PAGE_NAME = {
    'chewing': 'languageChewing',
    'hangul': 'languageHangul',
    'mozc': 'languageMozc',
    'mozc-dv': 'languageMozc',
    'mozc-jp': 'languageMozc',
    'pinyin': 'languagePinyin',
  };

  /////////////////////////////////////////////////////////////////////////////
  // LanguageOptions class:

  /**
   * Encapsulated handling of ChromeOS language options page.
   * @constructor
   */
  function LanguageOptions(model) {
    OptionsPage.call(this, 'languages', templateData.languagePageTabTitle,
                     'languagePage');
  }

  cr.addSingletonGetter(LanguageOptions);

  // Inherit LanguageOptions from OptionsPage.
  LanguageOptions.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * Initializes LanguageOptions page.
     * Calls base class implementation to starts preference initialization.
     */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      var languageOptionsList = $('language-options-list');
      LanguageList.decorate(languageOptionsList);

      languageOptionsList.addEventListener('change',
          this.handleLanguageOptionsListChange_.bind(this));
      languageOptionsList.addEventListener('save',
          this.handleLanguageOptionsListSave_.bind(this));

      this.addEventListener('visibleChange',
                            this.handleVisibleChange_.bind(this));

      if (cr.isChromeOS) {
        this.initializeInputMethodList_();
        this.initializeLanguageCodeToInputMehotdIdsMap_();
      }
      Preferences.getInstance().addEventListener(this.spellCheckDictionaryPref,
          this.handleSpellCheckDictionaryPrefChange_.bind(this));

      // Set up add button.
      $('language-options-add-button').onclick = function(e) {
        // Add the language without showing the overlay if it's specified in
        // the URL hash (ex. lang_add=ja).  Used for automated testing.
        var match = document.location.hash.match(/\blang_add=([\w-]+)/);
        if (match) {
          var addLanguageCode = match[1];
          $('language-options-list').addLanguage(addLanguageCode);
        } else {
          OptionsPage.navigateToPage('addLanguage');
        }
      };
      // Set up remove button.
      $('language-options-remove-button').addEventListener('click',
          this.handleRemoveButtonClick_.bind(this));

      if (cr.isChromeOS) {
        // Listen to user clicks on the add language list.
        var addLanguageList = $('add-language-overlay-language-list');
        addLanguageList.addEventListener('click',
            this.handleAddLanguageListClick_.bind(this));
      } else {
        // Listen to add language dialog ok button.
        var addLanguageOkButton = $('add-language-overlay-ok-button');
        addLanguageOkButton.addEventListener('click',
            this.handleAddLanguageOkButtonClick_.bind(this));

        // Show experimental features if enabled.
        if (templateData.experimentalSpellCheckFeatures == 'true') {
          $('auto-spell-correction-option').classList.remove('hidden');
        }
      }
    },

    // The preference is a CSV string that describes preload engines
    // (i.e. active input methods).
    preloadEnginesPref: 'settings.language.preload_engines',
    // The list of preload engines, like ['mozc', 'pinyin'].
    preloadEngines_: [],
    // The preference is a string that describes the spell check
    // dictionary language, like "en-US".
    spellCheckDictionaryPref: 'spellcheck.dictionary',
    spellCheckDictionary_: "",
    // The map of language code to input method IDs, like:
    // {'ja': ['mozc', 'mozc-jp'], 'zh-CN': ['pinyin'], ...}
    languageCodeToInputMethodIdsMap_: {},

    /**
     * Initializes the input method list.
     */
    initializeInputMethodList_: function() {
      var inputMethodList = $('language-options-input-method-list');
      var inputMethodListData = templateData.inputMethodList;

      // Add all input methods, but make all of them invisible here. We'll
      // change the visibility in handleLanguageOptionsListChange_() based
      // on the selected language. Note that we only have less than 100
      // input methods, so creating DOM nodes at once here should be ok.
      for (var i = 0; i < inputMethodListData.length; i++) {
        var inputMethod = inputMethodListData[i];
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.inputMethodId = inputMethod.id;
        // Listen to user clicks.
        input.addEventListener('click',
                               this.handleCheckboxClick_.bind(this));
        var label = document.createElement('label');
        label.appendChild(input);
        // Adding a space between the checkbox and the text. This is a bit
        // dirty, but we rely on a space character for all other checkboxes.
        label.appendChild(document.createTextNode(
            ' ' + inputMethod.displayName));
        label.style.display = 'none';
        label.languageCodeSet = inputMethod.languageCodeSet;
        // Add the configure button if the config page is present for this
        // input method.
        if (inputMethod.id in INPUT_METHOD_ID_TO_CONFIG_PAGE_NAME) {
          var pageName = INPUT_METHOD_ID_TO_CONFIG_PAGE_NAME[inputMethod.id];
          var button = this.createConfigureInputMethodButton_(inputMethod.id,
                                                              pageName);
          label.appendChild(button);
        }

        inputMethodList.appendChild(label);
      }
      // Listen to pref change once the input method list is initialized.
      Preferences.getInstance().addEventListener(this.preloadEnginesPref,
          this.handlePreloadEnginesPrefChange_.bind(this));
    },

    /**
     * Creates a configure button for the given input method ID.
     * @param {string} inputMethodId Input method ID (ex. "pinyin").
     * @param {string} pageName Name of the config page (ex. "languagePinyin").
     * @private
     */
    createConfigureInputMethodButton_: function(inputMethodId, pageName) {
      var button = document.createElement('button');
      button.textContent = localStrings.getString('configure');
      button.onclick = function(e) {
        // Prevent the default action (i.e. changing the checked property
        // of the checkbox). The button click here should not be handled
        // as checkbox click.
        e.preventDefault();
        chrome.send('inputMethodOptionsOpen', [inputMethodId]);
        OptionsPage.navigateToPage(pageName);
      }
      return button;
    },

    /**
     * Handles OptionsPage's visible property change event.
     * @param {Event} e Property change event.
     * @private
     */
    handleVisibleChange_: function(e) {
      if (this.visible) {
        $('language-options-list').redraw();
        chrome.send('languageOptionsOpen');
      }
    },

    /**
     * Handles languageOptionsList's change event.
     * @param {Event} e Change event.
     * @private
     */
    handleLanguageOptionsListChange_: function(e) {
      var languageOptionsList = $('language-options-list');
      var languageCode = languageOptionsList.getSelectedLanguageCode();
      // Select the language if it's specified in the URL hash (ex. lang=ja).
      // Used for automated testing.
      var match = document.location.hash.match(/\blang=([\w-]+)/);
      if (match) {
        var specifiedLanguageCode = match[1];
        if (languageOptionsList.selectLanguageByCode(specifiedLanguageCode)) {
          languageCode = specifiedLanguageCode;
        }
      }
      this.updateSelectedLanguageName_(languageCode);
      if (cr.isWindows || cr.isChromeOS)
        this.updateUiLanguageButton_(languageCode);
      this.updateSpellCheckLanguageButton_(languageCode);
      if (cr.isChromeOS)
        this.updateInputMethodList_(languageCode);
      this.updateLanguageListInAddLanguageOverlay_();
    },

    /**
     * Handles languageOptionsList's save event.
     * @param {Event} e Save event.
     * @private
     */
    handleLanguageOptionsListSave_: function(e) {
      if (cr.isChromeOS) {
        // Sort the preload engines per the saved languages before save.
        this.preloadEngines_ = this.sortPreloadEngines_(this.preloadEngines_);
        this.savePreloadEnginesPref_();
      }
    },

    /**
     * Sorts preloadEngines_ by languageOptionsList's order.
     * @param {Array} preloadEngines List of preload engines.
     * @return {Array} Returns sorted preloadEngines.
     * @private
     */
    sortPreloadEngines_: function(preloadEngines) {
      // For instance, suppose we have two languages and associated input
      // methods:
      //
      // - Korean: hangul
      // - Chinese: pinyin
      //
      // The preloadEngines preference should look like "hangul,pinyin".
      // If the user reverse the order, the preference should be reorderd
      // to "pinyin,hangul".
      var languageOptionsList = $('language-options-list');
      var languageCodes = languageOptionsList.getLanguageCodes();

      // Convert the list into a dictonary for simpler lookup.
      var preloadEngineSet = {};
      for (var i = 0; i < preloadEngines.length; i++) {
        preloadEngineSet[preloadEngines[i]] = true;
      }

      // Create the new preload engine list per the language codes.
      var newPreloadEngines = [];
      for (var i = 0; i < languageCodes.length; i++) {
        var languageCode = languageCodes[i];
        var inputMethodIds = this.languageCodeToInputMethodIdsMap_[
            languageCode];
        // Check if we have active input methods associated with the language.
        for (var j = 0; j < inputMethodIds.length; j++) {
          var inputMethodId = inputMethodIds[j];
          if (inputMethodId in preloadEngineSet) {
            // If we have, add it to the new engine list.
            newPreloadEngines.push(inputMethodId);
            // And delete it from the set. This is necessary as one input
            // method can be associated with more than one language thus
            // we should avoid having duplicates in the new list.
            delete preloadEngineSet[inputMethodId];
          }
        }
      }

      return newPreloadEngines;
    },

    /**
     * Initializes the map of language code to input method IDs.
     * @private
     */
    initializeLanguageCodeToInputMehotdIdsMap_: function() {
      var inputMethodList = templateData.inputMethodList;
      for (var i = 0; i < inputMethodList.length; i++) {
        var inputMethod = inputMethodList[i];
        for (var languageCode in inputMethod.languageCodeSet) {
          if (languageCode in this.languageCodeToInputMethodIdsMap_) {
            this.languageCodeToInputMethodIdsMap_[languageCode].push(
                inputMethod.id);
          } else {
            this.languageCodeToInputMethodIdsMap_[languageCode] =
                [inputMethod.id];
          }
        }
      }
    },

    /**
     * Updates the currently selected language name.
     * @param {string} languageCode Language code (ex. "fr").
     * @private
     */
    updateSelectedLanguageName_: function(languageCode) {
      var languageDisplayName = LanguageList.getDisplayNameFromLanguageCode(
          languageCode);
      var languageNativeDisplayName =
          LanguageList.getNativeDisplayNameFromLanguageCode(languageCode);
      // If the native name is different, add it.
      if (languageDisplayName != languageNativeDisplayName) {
        languageDisplayName += ' - ' + languageNativeDisplayName;
      }
      // Update the currently selected language name.
      $('language-options-language-name').textContent = languageDisplayName;
    },

    /**
     * Updates the UI language button.
     * @param {string} languageCode Language code (ex. "fr").
     * @private
     */
    updateUiLanguageButton_: function(languageCode) {
      var uiLanguageButton = $('language-options-ui-language-button');
      // Check if the language code matches the current UI language.
      if (languageCode == templateData.currentUiLanguageCode) {
        // If it matches, the button just says that the UI language is
        // currently in use.
        uiLanguageButton.textContent =
            localStrings.getString('is_displayed_in_this_language');
        // Make it look like a text label.
        uiLanguageButton.className = 'text-button';
        // Remove the event listner.
        uiLanguageButton.onclick = undefined;
      } else if (languageCode in templateData.uiLanguageCodeSet) {
        // If the language is supported as UI language, users can click on
        // the button to change the UI language.
        uiLanguageButton.textContent =
            localStrings.getString('display_in_this_language');
        uiLanguageButton.className = '';
        // Send the change request to Chrome.
        uiLanguageButton.onclick = function(e) {
          chrome.send('uiLanguageChange', [languageCode]);
        }
        $('language-options-ui-restart-button').onclick = function(e) {
          chrome.send('uiLanguageRestart');
        }
      } else {
        // If the language is not supported as UI language, the button
        // just says that Chromium OS cannot be displayed in this language.
        uiLanguageButton.textContent =
            localStrings.getString('cannot_be_displayed_in_this_language');
        uiLanguageButton.className = 'text-button';
        uiLanguageButton.onclick = undefined;
      }
      uiLanguageButton.style.display = 'block';
      $('language-options-ui-notification-bar').style.display = 'none';
    },

    /**
     * Updates the spell check language button.
     * @param {string} languageCode Language code (ex. "fr").
     * @private
     */
    updateSpellCheckLanguageButton_: function(languageCode) {
      var spellCheckLanguageButton = $(
          'language-options-spell-check-language-button');
      // Check if the language code matches the current spell check language.
      if (languageCode == this.spellCheckDictionary_) {
        // If it matches, the button just says that the spell check language is
        // currently in use.
        spellCheckLanguageButton.textContent =
            localStrings.getString('is_used_for_spell_checking');
        // Make it look like a text label.
        spellCheckLanguageButton.className = 'text-button';
        // Remove the event listner.
        spellCheckLanguageButton.onclick = undefined;
      } else if (languageCode in templateData.spellCheckLanguageCodeSet) {
        // If the language is supported as spell check language, users can
        // click on the button to change the spell check language.
        spellCheckLanguageButton.textContent =
            localStrings.getString('use_this_for_spell_checking');
        spellCheckLanguageButton.className = '';
        spellCheckLanguageButton.languageCode = languageCode;
        // Add an event listner to the click event.
        spellCheckLanguageButton.addEventListener('click',
            this.handleSpellCheckLanguageButtonClick_.bind(this));
      } else {
        // If the language is not supported as spell check language, the
        // button just says that this language cannot be used for spell
        // checking.
        spellCheckLanguageButton.textContent =
            localStrings.getString('cannot_be_used_for_spell_checking');
        spellCheckLanguageButton.className = 'text-button';
        spellCheckLanguageButton.onclick = undefined;
      }
      spellCheckLanguageButton.style.display = 'block';
      $('language-options-ui-notification-bar').style.display = 'none';
    },

    /**
     * Updates the input method list.
     * @param {string} languageCode Language code (ex. "fr").
     * @private
     */
    updateInputMethodList_: function(languageCode) {
      // Give one of the checkboxes or buttons focus, if it's specified in the
      // URL hash (ex. focus=mozc). Used for automated testing.
      var focusInputMethodId = -1;
      var match = document.location.hash.match(/\bfocus=([\w:-]+)\b/);
      if (match) {
        focusInputMethodId = match[1];
      }
      // Change the visibility of the input method list. Input methods that
      // matches |languageCode| will become visible.
      var inputMethodList = $('language-options-input-method-list');
      var labels = inputMethodList.querySelectorAll('label');
      for (var i = 0; i < labels.length; i++) {
        var label = labels[i];
        if (languageCode in label.languageCodeSet) {
          label.style.display = 'block';
          var input = label.childNodes[0];
          // Give it focus if the ID matches.
          if (input.inputMethodId == focusInputMethodId) {
            input.focus();
          }
        } else {
          label.style.display = 'none';
        }
      }
      if (focusInputMethodId == 'remove') {
        $('language-options-remove-button').focus();
      } else if (focusInputMethodId == 'add') {
        $('language-options-add-button').focus();
      }
    },

    /**
     * Updates the language list in the add language overlay.
     * @param {string} languageCode Language code (ex. "fr").
     * @private
     */
    updateLanguageListInAddLanguageOverlay_: function(languageCode) {
      // Change the visibility of the language list in the add language
      // overlay. Languages that are already active will become invisible,
      // so that users don't add the same language twice.
      var languageOptionsList = $('language-options-list');
      var languageCodes = languageOptionsList.getLanguageCodes();
      var languageCodeSet = {};
      for (var i = 0; i < languageCodes.length; i++) {
        languageCodeSet[languageCodes[i]] = true;
      }
      var addLanguageList = $('add-language-overlay-language-list');
      var lis = addLanguageList.querySelectorAll('li');
      for (var i = 0; i < lis.length; i++) {
        // The first child button knows the language code.
        var button = lis[i].childNodes[0];
        if (button.languageCode in languageCodeSet) {
          lis[i].style.display = 'none';
        } else {
          lis[i].style.display = 'block';
        }
      }
    },

    /**
     * Handles preloadEnginesPref change.
     * @param {Event} e Change event.
     * @private
     */
    handlePreloadEnginesPrefChange_: function(e) {
      var value = e.value.value;
      this.preloadEngines_ = this.filterBadPreloadEngines_(value.split(','));
      this.updateCheckboxesFromPreloadEngines_();
    },

    /**
     * Handles input method checkbox's click event.
     * @param {Event} e Click event.
     * @private
     */
    handleCheckboxClick_ : function(e) {
      var checkbox = e.target;
      if (this.preloadEngines_.length == 1 && !checkbox.checked) {
        // Don't allow disabling the last input method.
        this.showNotification_(
            localStrings.getString('please_add_another_input_method'),
            localStrings.getString('ok_button'));
        checkbox.checked = true;
        return;
      }
      if (checkbox.checked) {
        chrome.send('inputMethodEnable', [checkbox.inputMethodId]);
      } else {
        chrome.send('inputMethodDisable', [checkbox.inputMethodId]);
      }
      this.updatePreloadEnginesFromCheckboxes_();
      this.preloadEngines_ = this.sortPreloadEngines_(this.preloadEngines_);
      this.savePreloadEnginesPref_();
    },

    /**
     * Handles add language list's click event.
     * @param {Event} e Click event.
     */
    handleAddLanguageListClick_ : function(e) {
      var languageOptionsList = $('language-options-list');
      var languageCode = e.target.languageCode;
      // languageCode can be undefined, if click was made on some random
      // place in the overlay, rather than a button. Ignore it.
      if (!languageCode) {
        return;
      }
      languageOptionsList.addLanguage(languageCode);
      var inputMethodIds = this.languageCodeToInputMethodIdsMap_[languageCode];
      // Enable the first input method for the language added.
      if (inputMethodIds && inputMethodIds[0] &&
          // Don't add the input method it's already present. This can
          // happen if the same input method is shared among multiple
          // languages (ex. English US keyboard is used for English US and
          // Filipino).
          this.preloadEngines_.indexOf(inputMethodIds[0]) == -1) {
        this.preloadEngines_.push(inputMethodIds[0]);
        this.updateCheckboxesFromPreloadEngines_();
        this.savePreloadEnginesPref_();
      }
      OptionsPage.closeOverlay();
    },

    /**
     * Handles add language dialog ok button.
     */
    handleAddLanguageOkButtonClick_ : function() {
      var languagesSelect = $('add-language-overlay-language-list');
      var selectedIndex = languagesSelect.selectedIndex;
      if (selectedIndex >= 0) {
        var selection = languagesSelect.options[selectedIndex];
        $('language-options-list').addLanguage(String(selection.value));
        OptionsPage.closeOverlay();
      }
    },

    /**
     * Handles remove button's click event.
     * @param {Event} e Click event.
     */
    handleRemoveButtonClick_: function(e) {
      var languageOptionsList = $('language-options-list');
      var languageCode = languageOptionsList.getSelectedLanguageCode();
      // Don't allow removing the language if it's as UI language.
      if (languageCode == templateData.currentUiLanguageCode) {
        this.showNotification_(
            localStrings.getString('this_language_is_currently_in_use'),
            localStrings.getString('ok_button'));
        return;
      }
      if (cr.isChromeOS) {
        // Disable input methods associated with |languageCode|.
        // Don't allow removing the language if cerntain conditions are met.
        // See removePreloadEnginesByLanguageCode_() for details.
        if (!this.removePreloadEnginesByLanguageCode_(languageCode)) {
          this.showNotification_(
              localStrings.getString('please_add_another_language'),
              localStrings.getString('ok_button'));
          return;
        }
      }
      languageOptionsList.removeSelectedLanguage();
    },

    /**
     * Handles spellCheckDictionaryPref change.
     * @param {Event} e Change event.
     * @private
     */
    handleSpellCheckDictionaryPrefChange_: function(e) {
      var languageCode = e.value.value
      this.spellCheckDictionary_ = languageCode;
      var languageOptionsList = $('language-options-list');
      var selectedLanguageCode = languageOptionsList.getSelectedLanguageCode();
      this.updateSpellCheckLanguageButton_(selectedLanguageCode);
    },

    /**
     * Handles spellCheckLanguageButton click.
     * @param {Event} e Click event.
     * @private
     */
    handleSpellCheckLanguageButtonClick_: function(e) {
      var languageCode = e.target.languageCode;
      // Save the preference.
      Preferences.setStringPref(this.spellCheckDictionaryPref,
                                languageCode);
      chrome.send('spellCheckLanguageChange', [languageCode]);
    },

    /**
     * Removes preload engines associated with the given language code.
     * However, this function does not remove engines (input methods) that
     * are used for other active languages. For instance, if "xkb:us::eng"
     * is used for English and Filipino, and the two languages are active,
     * this function does not remove "xkb:us::eng" when either of these
     * languages is removed. Instead, it'll remove "xkb:us::eng" when the
     * both languages are gone.
     *
     * @param {string} languageCode Language code (ex. "fr").
     * @return {boolean} Returns true on success.
     * @private
     */
    removePreloadEnginesByLanguageCode_: function(languageCode) {
      // First create the set of engines to be removed from input methods
      // associated with the language code.
      var enginesToBeRemovedSet = {};
      var inputMethodIds = this.languageCodeToInputMethodIdsMap_[languageCode];
      for (var i = 0; i < inputMethodIds.length; i++) {
        enginesToBeRemovedSet[inputMethodIds[i]] = true;
      }

      // Then eliminate engines that are also used for other active languages.
      var languageCodes = $('language-options-list').getLanguageCodes();
      for (var i = 0; i < languageCodes.length; i++) {
        // Skip the target language code.
        if (languageCodes[i] == languageCode) {
          continue;
        }
        // Check if input methods used in this language are included in
        // enginesToBeRemovedSet. If so, eliminate these from the set, so
        // we don't remove this time.
        var inputMethodIdsForAnotherLanguage =
            this.languageCodeToInputMethodIdsMap_[languageCodes[i]];
        for (var j = 0; j < inputMethodIdsForAnotherLanguage.length; j++) {
          var inputMethodId = inputMethodIdsForAnotherLanguage[j];
          if (inputMethodId in enginesToBeRemovedSet) {
            delete enginesToBeRemovedSet[inputMethodId];
          }
        }
      }

      // Update the preload engine list with the to-be-removed set.
      var newPreloadEngines = [];
      for (var i = 0; i < this.preloadEngines_.length; i++) {
        if (!(this.preloadEngines_[i] in enginesToBeRemovedSet)) {
          newPreloadEngines.push(this.preloadEngines_[i]);
        }
      }
      // Don't allow this operation if it causes the number of preload
      // engines to be zero.
      if (newPreloadEngines.length == 0) {
        return false;
      }
      this.preloadEngines_ = newPreloadEngines;
      this.savePreloadEnginesPref_();
      return true;
    },

    /**
     * Saves the preload engines preference.
     * @private
     */
    savePreloadEnginesPref_: function() {
      Preferences.setStringPref(this.preloadEnginesPref,
                                this.preloadEngines_.join(','));
    },

    /**
     * Updates the checkboxes in the input method list from the preload
     * engines preference.
     * @private
     */
    updateCheckboxesFromPreloadEngines_: function() {
      // Convert the list into a dictonary for simpler lookup.
      var dictionary = {};
      for (var i = 0; i < this.preloadEngines_.length; i++) {
        dictionary[this.preloadEngines_[i]] = true;
      }

      var inputMethodList = $('language-options-input-method-list');
      var checkboxes = inputMethodList.querySelectorAll('input');
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = (checkboxes[i].inputMethodId in dictionary);
      }
    },

    /**
     * Updates the preload engines preference from the checkboxes in the
     * input method list.
     * @private
     */
    updatePreloadEnginesFromCheckboxes_: function() {
      this.preloadEngines_ = [];
      var inputMethodList = $('language-options-input-method-list');
      var checkboxes = inputMethodList.querySelectorAll('input');
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          this.preloadEngines_.push(checkboxes[i].inputMethodId);
        }
      }
    },

    /**
     * Filters bad preload engines in case bad preload engines are
     * stored in the preference. Removes duplicates as well.
     * @param {Array} preloadEngines List of preload engines.
     * @private
     */
    filterBadPreloadEngines_: function(preloadEngines) {
      // Convert the list into a dictonary for simpler lookup.
      var dictionary = {};
      for (var i = 0; i < templateData.inputMethodList.length; i++) {
        dictionary[templateData.inputMethodList[i].id] = true;
      }

      var filteredPreloadEngines = [];
      var seen = {};
      for (var i = 0; i < preloadEngines.length; i++) {
        // Check if the preload engine is present in the
        // dictionary, and not duplicate. Otherwise, skip it.
        if (preloadEngines[i] in dictionary && !(preloadEngines[i] in seen)) {
          filteredPreloadEngines.push(preloadEngines[i]);
          seen[preloadEngines[i]] = true;
        }
      }
      return filteredPreloadEngines;
    },

    // TODO(kochi): This is an adapted copy from new_new_tab.js.
    // If this will go as final UI, refactor this to share the component with
    // new new tab page.
    /**
     * Shows notification
     * @private
     */
    notificationTimeout_: null,
    showNotification_ : function(text, actionText, opt_delay) {
      var notificationElement = $('notification');
      var actionLink = notificationElement.querySelector('.link-color');
      var delay = opt_delay || 10000;

      function show() {
        window.clearTimeout(this.notificationTimeout_);
        notificationElement.classList.add('show');
        document.body.classList.add('notification-shown');
      }

      function hide() {
        window.clearTimeout(this.notificationTimeout_);
        notificationElement.classList.remove('show');
        document.body.classList.remove('notification-shown');
        // Prevent tabbing to the hidden link.
        actionLink.tabIndex = -1;
        // Setting tabIndex to -1 only prevents future tabbing to it. If,
        // however, the user switches window or a tab and then moves back to
        // this tab the element may gain focus. We therefore make sure that we
        // blur the element so that the element focus is not restored when
        // coming back to this window.
        actionLink.blur();
      }

      function delayedHide() {
        this.notificationTimeout_ = window.setTimeout(hide, delay);
      }

      notificationElement.firstElementChild.textContent = text;
      actionLink.textContent = actionText;

      actionLink.onclick = hide;
      actionLink.onkeydown = function(e) {
        if (e.keyIdentifier == 'Enter') {
          hide();
        }
      };
      notificationElement.onmouseover = show;
      notificationElement.onmouseout = delayedHide;
      actionLink.onfocus = show;
      actionLink.onblur = delayedHide;
      // Enable tabbing to the link now that it is shown.
      actionLink.tabIndex = 0;

      show();
      delayedHide();
    }
  };

  /**
   * Chrome callback for when the UI language preference is saved.
   */
  LanguageOptions.uiLanguageSaved = function() {
    $('language-options-ui-language-button').style.display = 'none';
    $('language-options-ui-notification-bar').style.display = 'block';
  };

  // Export
  return {
    LanguageOptions: LanguageOptions
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const ArrayDataModel = cr.ui.ArrayDataModel;

  /////////////////////////////////////////////////////////////////////////////
  // PasswordManager class:

  /**
   * Encapsulated handling of password and exceptions page.
   * @constructor
   */
  function PasswordManager() {
    this.activeNavTab = null;
    OptionsPage.call(this,
                     'passwords',
                     templateData.passwordsPageTabTitle,
                     'password-manager');
  }

  cr.addSingletonGetter(PasswordManager);

  PasswordManager.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * The saved passwords list.
     * @type {DeletableItemList}
     * @private
     */
    savedPasswordsList_: null,

    /**
     * The password exceptions list.
     * @type {DeletableItemList}
     * @private
     */
    passwordExceptionsList_: null,

    /** @inheritDoc */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      this.createSavedPasswordsList_();
      this.createPasswordExceptionsList_();
    },

    /** @inheritDoc */
    canShowPage: function() {
      return !PersonalOptions.disablePasswordManagement();
    },

    /** @inheritDoc */
    didShowPage: function() {
      // Updating the password lists may cause a blocking platform dialog pop up
      // (Mac, Linux), so we delay this operation until the page is shown.
      chrome.send('updatePasswordLists');
    },

    /**
     * Creates, decorates and initializes the saved passwords list.
     * @private
     */
    createSavedPasswordsList_: function() {
      this.savedPasswordsList_ = $('saved-passwords-list');
      options.passwordManager.PasswordsList.decorate(this.savedPasswordsList_);
      this.savedPasswordsList_.autoExpands = true;
    },

    /**
     * Creates, decorates and initializes the password exceptions list.
     * @private
     */
    createPasswordExceptionsList_: function() {
      this.passwordExceptionsList_ = $('password-exceptions-list');
      options.passwordManager.PasswordExceptionsList.decorate(
          this.passwordExceptionsList_);
      this.passwordExceptionsList_.autoExpands = true;
    },

    /**
     * Updates the data model for the saved passwords list with the values from
     * |entries|.
     * @param {Array} entries The list of saved password data.
     */
    setSavedPasswordsList_: function(entries) {
      this.savedPasswordsList_.dataModel = new ArrayDataModel(entries);
    },

    /**
     * Updates the data model for the password exceptions list with the values
     * from |entries|.
     * @param {Array} entries The list of password exception data.
     */
    setPasswordExceptionsList_: function(entries) {
      this.passwordExceptionsList_.dataModel = new ArrayDataModel(entries);
    },
  };

  /**
   * Call to remove a saved password.
   * @param rowIndex indicating the row to remove.
   */
  PasswordManager.removeSavedPassword = function(rowIndex) {
      chrome.send('removeSavedPassword', [String(rowIndex)]);
  };

  /**
   * Call to remove a password exception.
   * @param rowIndex indicating the row to remove.
   */
  PasswordManager.removePasswordException = function(rowIndex) {
      chrome.send('removePasswordException', [String(rowIndex)]);
  };

  /**
   * Call to remove all saved passwords.
   * @param tab contentType of the tab currently on.
   */
  PasswordManager.removeAllPasswords = function() {
    chrome.send('removeAllSavedPasswords');
  };

  /**
   * Call to remove all saved passwords.
   * @param tab contentType of the tab currently on.
   */
  PasswordManager.removeAllPasswordExceptions = function() {
    chrome.send('removeAllPasswordExceptions');
  };

  PasswordManager.setSavedPasswordsList = function(entries) {
    PasswordManager.getInstance().setSavedPasswordsList_(entries);
  };

  PasswordManager.setPasswordExceptionsList = function(entries) {
    PasswordManager.getInstance().setPasswordExceptionsList_(entries);
  };

  // Export
  return {
    PasswordManager: PasswordManager
  };

});

/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.passwordManager', function() {
  const ArrayDataModel = cr.ui.ArrayDataModel;
  const DeletableItemList = options.DeletableItemList;
  const DeletableItem = options.DeletableItem;
  const List = cr.ui.List;

  /**
   * Creates a new passwords list item.
   * @param {Array} entry An array of the form [url, username, password].
   * @constructor
   * @extends {cr.ui.ListItem}
   */
  function PasswordListItem(entry) {
    var el = cr.doc.createElement('div');
    el.dataItem = entry;
    el.__proto__ = PasswordListItem.prototype;
    el.decorate();

    return el;
  }

  PasswordListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /** @inheritDoc */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);

      // The URL of the site.
      var urlLabel = this.ownerDocument.createElement('div');
      urlLabel.classList.add('favicon-cell');
      urlLabel.classList.add('url');
      urlLabel.textContent = this.url;
      urlLabel.style.backgroundImage = url('chrome://favicon/' + this.url);
      this.contentElement.appendChild(urlLabel);

      // The stored username.
      var usernameLabel = this.ownerDocument.createElement('div');
      usernameLabel.className = 'name';
      usernameLabel.textContent = this.username;
      this.contentElement.appendChild(usernameLabel);

      // The stored password.
      var passwordInputDiv = this.ownerDocument.createElement('div');
      passwordInputDiv.className = 'password';

      // The password input field.
      var passwordInput = this.ownerDocument.createElement('input');
      passwordInput.type = 'password';
      passwordInput.className = 'inactive-password';
      passwordInput.readOnly = true;
      passwordInput.value = this.password;
      passwordInputDiv.appendChild(passwordInput);

      // The show/hide button.
      var button = this.ownerDocument.createElement('button');
      button.classList.add('hidden');
      button.classList.add('password-button');
      button.textContent = localStrings.getString('passwordShowButton');
      button.addEventListener('click', this.onClick_, true);
      passwordInputDiv.appendChild(button);

      this.contentElement.appendChild(passwordInputDiv);
    },

    /** @inheritDoc */
    selectionChanged: function() {
      var passwordInput = this.querySelector('input[type=password]');
      var textInput = this.querySelector('input[type=text]');
      var input = passwordInput || textInput;
      var button = input.nextSibling;
      if (this.selected) {
        input.classList.remove('inactive-password');
        button.classList.remove('hidden');
      } else {
        input.classList.add('inactive-password');
        button.classList.add('hidden');
      }
    },

    /**
     * On-click event handler. Swaps the type of the input field from password
     * to text and back.
     * @private
     */
    onClick_: function(event) {
      // The password is the input element previous to the button.
      var button = event.currentTarget;
      var passwordInput = button.previousSibling;
      if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        button.textContent = localStrings.getString('passwordHideButton');
      } else {
        passwordInput.type = 'password';
        button.textContent = localStrings.getString('passwordShowButton');
      }
    },

    /**
     * Get and set the URL for the entry.
     * @type {string}
     */
    get url() {
      return this.dataItem[0];
    },
    set url(url) {
      this.dataItem[0] = url;
    },

    /**
     * Get and set the username for the entry.
     * @type {string}
     */
    get username() {
      return this.dataItem[1];
    },
    set username(username) {
      this.dataItem[1] = username;
    },

    /**
     * Get and set the password for the entry.
     * @type {string}
     */
    get password() {
      return this.dataItem[2];
    },
    set password(password) {
      this.dataItem[2] = password;
    },
  };

  /**
   * Creates a new PasswordExceptions list item.
   * @param {Array} entry A pair of the form [url, username].
   * @constructor
   * @extends {Deletable.ListItem}
   */
  function PasswordExceptionsListItem(entry) {
    var el = cr.doc.createElement('div');
    el.dataItem = entry;
    el.__proto__ = PasswordExceptionsListItem.prototype;
    el.decorate();

    return el;
  }

  PasswordExceptionsListItem.prototype = {
    __proto__: DeletableItem.prototype,

    /**
     * Call when an element is decorated as a list item.
     */
    decorate: function() {
      DeletableItem.prototype.decorate.call(this);

      // The URL of the site.
      var urlLabel = this.ownerDocument.createElement('div');
      urlLabel.className = 'url';
      urlLabel.classList.add('favicon-cell');
      urlLabel.textContent = this.url;
      urlLabel.style.backgroundImage = url('chrome://favicon/' + this.url);
      this.contentElement.appendChild(urlLabel);
    },

    /**
     * Get the url for the entry.
     * @type {string}
     */
    get url() {
      return this.dataItem;
    },
    set url(url) {
      this.dataItem = url;
    },
  };

  /**
   * Create a new passwords list.
   * @constructor
   * @extends {cr.ui.List}
   */
  var PasswordsList = cr.ui.define('list');

  PasswordsList.prototype = {
    __proto__: DeletableItemList.prototype,

    /** @inheritDoc */
    createItem: function(entry) {
      return new PasswordListItem(entry);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      PasswordManager.removeSavedPassword(index);
    },

    /**
     * The length of the list.
     */
    get length() {
      return this.dataModel.length;
    },
  };

  /**
   * Create a new passwords list.
   * @constructor
   * @extends {cr.ui.List}
   */
  var PasswordExceptionsList = cr.ui.define('list');

  PasswordExceptionsList.prototype = {
    __proto__: DeletableItemList.prototype,

    /** @inheritDoc */
    createItem: function(entry) {
      return new PasswordExceptionsListItem(entry);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      PasswordManager.removePasswordException(index);
    },

    /**
     * The length of the list.
     */
    get length() {
      return this.dataModel.length;
    },
  };

  return {
    PasswordListItem: PasswordListItem,
    PasswordExceptionsListItem: PasswordExceptionsListItem,
    PasswordsList: PasswordsList,
    PasswordExceptionsList: PasswordExceptionsList,
  };
});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {

  var OptionsPage = options.OptionsPage;

  // State variables.
  var syncEnabled = false;
  var syncSetupCompleted = false;

  /**
   * Encapsulated handling of personal options page.
   * @constructor
   */
  function PersonalOptions() {
    OptionsPage.call(this, 'personal',
                     templateData.personalPageTabTitle,
                     'personal-page');
  }

  cr.addSingletonGetter(PersonalOptions);

  PersonalOptions.prototype = {
    // Inherit PersonalOptions from OptionsPage.
    __proto__: options.OptionsPage.prototype,

    // Initialize PersonalOptions page.
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      var self = this;
      $('sync-action-link').onclick = function(event) {
        chrome.send('showSyncActionDialog');
      };
      $('start-stop-sync').onclick = function(event) {
        if (self.syncSetupCompleted)
          self.showStopSyncingOverlay_();
        else
          chrome.send('showSyncLoginDialog');
      };
      $('customize-sync').onclick = function(event) {
        chrome.send('showCustomizeSyncDialog');
      };
      $('privacy-dashboard-link').onclick = function(event) {
        chrome.send('openPrivacyDashboardTabAndActivate');
      };
      $('manage-passwords').onclick = function(event) {
        OptionsPage.navigateToPage('passwords');
        OptionsPage.showTab($('passwords-nav-tab'));
        chrome.send('coreOptionsUserMetricsAction',
            ['Options_ShowPasswordManager']);
      };
      $('autofill-settings').onclick = function(event) {
        OptionsPage.navigateToPage('autofill');
        chrome.send('coreOptionsUserMetricsAction',
            ['Options_ShowAutoFillSettings']);
      };
      $('themes-reset').onclick = function(event) {
        chrome.send('themesReset');
      };

      if (!cr.isChromeOS) {
        $('import-data').onclick = function(event) {
          OptionsPage.navigateToPage('importData');
          chrome.send('coreOptionsUserMetricsAction', ['Import_ShowDlg']);
        };

        if ($('themes-GTK-button')) {
          $('themes-GTK-button').onclick = function(event) {
            chrome.send('themesSetGTK');
          };
        }
      } else {
        chrome.send('loadAccountPicture');
      }

      if (cr.commandLine.options['--bwsi']) {
        // Disable the screen lock checkbox for the guest mode.
        $('enable-screen-lock').disabled = true;
      }

      if (PersonalOptions.disablePasswordManagement()) {
        $('passwords-offersave').disabled = true;
        $('passwords-neversave').disabled = true;
        $('passwords-offersave').value = false;
        $('passwords-neversave').value = true;
        $('manage-passwords').disabled = true;
      }
    },

    showStopSyncingOverlay_: function(event) {
      AlertOverlay.show(localStrings.getString('stop_syncing_title'),
                        localStrings.getString('stop_syncing_explanation'),
                        localStrings.getString('stop_syncing_confirm'),
                        localStrings.getString('cancel'),
                        function() { chrome.send('stopSyncing'); });
    },

    setElementVisible_: function(element, visible) {
      if (visible)
        element.classList.remove('hidden');
      else
        element.classList.add('hidden');
    },

    setSyncEnabled_: function(enabled) {
      this.syncEnabled = enabled;
    },

    setSyncSetupCompleted_: function(completed) {
      this.syncSetupCompleted = completed;
      this.setElementVisible_($('customize-sync'), completed);
    },

    setAccountPicture_: function(image) {
      $('account-picture').src = image;
    },

    setSyncStatus_: function(status) {
      $('sync-status-text').textContent = status;
    },

    setSyncStatusErrorVisible_: function(visible) {
      visible ? $('sync-status').classList.add('sync-error') :
                $('sync-status').classList.remove('sync-error');
    },

    setSyncActionLinkEnabled_: function(enabled) {
      $('sync-action-link').disabled = !enabled;
    },

    setSyncActionLinkLabel_: function(status) {
      $('sync-action-link').textContent = status;

      // link-button does is not zero-area when the contents of the button are
      // empty, so explicitly hide the element.
      this.setElementVisible_($('sync-action-link'), status.length != 0);
    },

    setStartStopButtonVisible_: function(visible) {
      this.setElementVisible_($('start-stop-sync'), visible);
    },

    setStartStopButtonEnabled_: function(enabled) {
      $('start-stop-sync').disabled = !enabled;
    },

    setStartStopButtonLabel_: function(label) {
      $('start-stop-sync').textContent = label;
    },

    setGtkThemeButtonEnabled_: function(enabled) {
      if (!cr.isChromeOS && navigator.platform.match(/linux|BSD/i)) {
        $('themes-GTK-button').disabled = !enabled;
      }
    },

    setThemesResetButtonEnabled_: function(enabled) {
      $('themes-reset').disabled = !enabled;
    },

    hideSyncSection_: function() {
      this.setElementVisible_($('sync-section'), false);
    },

    /**
     * Toggles the visibility of the data type checkboxes based on whether they
     * are enabled on not.
     * @param {Object} dict A mapping from data type to a boolean indicating
     *     whether it is enabled.
     * @private
     */
    setRegisteredDataTypes_: function(dict) {
      for (var type in dict) {
        if (type.match(/Registered$/) && !dict[type]) {
          node = $(type.replace(/([a-z]+)Registered$/i, '$1').toLowerCase()
                   + '-check');
          if (node)
            node.parentNode.style.display = 'none';
        }
      }
    },
  };

  /**
   * Returns whether the user should be able to manage (view and edit) their
   * stored passwords. Password management is disabled in guest mode.
   * @return {boolean} True if password management should be disabled.
   */
  PersonalOptions.disablePasswordManagement = function() {
    return cr.commandLine.options['--bwsi'];
  };

  // Forward public APIs to private implementations.
  [
    'setSyncEnabled',
    'setSyncSetupCompleted',
    'setAccountPicture',
    'setSyncStatus',
    'setSyncStatusErrorVisible',
    'setSyncActionLinkEnabled',
    'setSyncActionLinkLabel',
    'setStartStopButtonVisible',
    'setStartStopButtonEnabled',
    'setStartStopButtonLabel',
    'setGtkThemeButtonEnabled',
    'setThemesResetButtonEnabled',
    'hideSyncSection',
    'setRegisteredDataTypes',
  ].forEach(function(name) {
    PersonalOptions[name] = function(value) {
      PersonalOptions.getInstance()[name + '_'](value);
    };
  });

  // Export
  return {
    PersonalOptions: PersonalOptions
  };

});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;
  const ArrayDataModel = cr.ui.ArrayDataModel;

  /**
   * Encapsulated handling of search engine management page.
   * @constructor
   */
  function SearchEngineManager() {
    this.activeNavTab = null;
    OptionsPage.call(this, 'searchEngines',
                     templateData.searchEngineManagerPageTabTitle,
                     'searchEngineManagerPage');
  }

  cr.addSingletonGetter(SearchEngineManager);

  SearchEngineManager.prototype = {
    __proto__: OptionsPage.prototype,

    /**
     * List for default search engine options
     * @type {boolean}
     * @private
     */
    defaultsList_: null,

    /**
     * List for other search engine options
     * @type {boolean}
     * @private
     */
    othersList_: null,

    /** inheritDoc */
    initializePage: function() {
      OptionsPage.prototype.initializePage.call(this);

      this.defaultsList_ = $('defaultSearchEngineList');
      this.setUpList_(this.defaultsList_);

      this.othersList_ = $('otherSearchEngineList');
      this.setUpList_(this.othersList_);
    },

    /**
     * Sets up the given list as a search engine list
     * @param {List} list The list to set up.
     * @private
     */
    setUpList_: function(list) {
      options.search_engines.SearchEngineList.decorate(list);
      list.autoExpands = true;
    },

    /**
     * Updates the search engine list with the given entries.
     * @private
     * @param {Array} defaultEngines List of possible default search engines.
     * @param {Array} otherEngines List of other search engines.
     */
    updateSearchEngineList_: function(defaultEngines, otherEngines) {
      this.defaultsList_.dataModel = new ArrayDataModel(defaultEngines);
      var othersModel = new ArrayDataModel(otherEngines);
      // Add a "new engine" row.
      othersModel.push({
        'modelIndex': '-1'
      });
      this.othersList_.dataModel = othersModel;
    },
  };

  SearchEngineManager.updateSearchEngineList = function(defaultEngines,
                                                        otherEngines) {
    SearchEngineManager.getInstance().updateSearchEngineList_(defaultEngines,
                                                              otherEngines);
  };

  SearchEngineManager.validityCheckCallback = function(validity, modelIndex) {
    // Forward to both lists; the one without a matching modelIndex will ignore
    // it.
    SearchEngineManager.getInstance().defaultsList_.validationComplete(
        validity, modelIndex);
    SearchEngineManager.getInstance().othersList_.validationComplete(
        validity, modelIndex);
  };

  // Export
  return {
    SearchEngineManager: SearchEngineManager
  };

});

/* ####################### */
// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options.search_engines', function() {
  const InlineEditableItemList = options.InlineEditableItemList;
  const InlineEditableItem = options.InlineEditableItem;
  const ListSelectionController = cr.ui.ListSelectionController;

  /**
   * Creates a new search engine list item.
   * @param {Object} searchEnigne The search engine this represents.
   * @constructor
   * @extends {cr.ui.ListItem}
   */
  function SearchEngineListItem(searchEngine) {
    var el = cr.doc.createElement('div');
    el.searchEngine_ = searchEngine;
    SearchEngineListItem.decorate(el);
    return el;
  }

  /**
   * Decorates an element as a search engine list item.
   * @param {!HTMLElement} el The element to decorate.
   */
  SearchEngineListItem.decorate = function(el) {
    el.__proto__ = SearchEngineListItem.prototype;
    el.decorate();
  };

  SearchEngineListItem.prototype = {
    __proto__: InlineEditableItem.prototype,

    /**
     * Input field for editing the engine name.
     * @type {HTMLElement}
     * @private
     */
    nameField_: null,

    /**
     * Input field for editing the engine keyword.
     * @type {HTMLElement}
     * @private
     */
    keywordField_: null,

    /**
     * Input field for editing the engine url.
     * @type {HTMLElement}
     * @private
     */
    urlField_: null,

    /**
     * Whether or not this is a placeholder for adding an engine.
     * @type {boolean}
     * @private
     */
    isPlaceholder_: false,

    /**
     * Whether or not an input validation request is currently outstanding.
     * @type {boolean}
     * @private
     */
    waitingForValidation_: false,

    /**
     * Whether or not the current set of input is known to be valid.
     * @type {boolean}
     * @private
     */
    currentlyValid_: false,

    /** @inheritDoc */
    decorate: function() {
      InlineEditableItem.prototype.decorate.call(this);

      var engine = this.searchEngine_;

      if (engine['modelIndex'] == '-1') {
        this.isPlaceholder_ = true;
        engine['name'] = '';
        engine['keyword'] = '';
        engine['url'] = '';
      }

      this.currentlyValid_ = !this.isPlaceholder_;

      if (engine['default'])
        this.classList.add('default');

      this.deletable = engine['canBeRemoved'];

      // Construct the name column.
      var nameColEl = this.ownerDocument.createElement('div');
      nameColEl.className = 'name-column';
      this.contentElement.appendChild(nameColEl);

      // Add the favicon.
      var faviconDivEl = this.ownerDocument.createElement('div');
      faviconDivEl.className = 'favicon';
      var imgEl = this.ownerDocument.createElement('img');
      imgEl.src = 'chrome://favicon/iconurl/' + engine['iconURL'];
      faviconDivEl.appendChild(imgEl);
      nameColEl.appendChild(faviconDivEl);

      var nameEl = this.createEditableTextCell(engine['displayName'],
                                               this.isPlaceholder_);
      nameColEl.appendChild(nameEl);

      // Then the keyword column.
      var keywordEl = this.createEditableTextCell(engine['keyword'],
                                                  this.isPlaceholder_);
      keywordEl.className = 'keyword-column';
      this.contentElement.appendChild(keywordEl);

      // And the URL column.
      var urlEl = this.createEditableTextCell(engine['url'],
                                              this.isPlaceholder_);
      var urlWithButtonEl = this.ownerDocument.createElement('div');
      urlWithButtonEl.appendChild(urlEl);
      urlWithButtonEl.className = 'url-column';
      this.contentElement.appendChild(urlWithButtonEl);
      // Add the Make Default button. Temporary until drag-and-drop re-ordering
      // is implemented. When this is removed, remove the extra div above.
      if (engine['canBeDefault']) {
        var makeDefaultButtonEl = this.ownerDocument.createElement('button');
        makeDefaultButtonEl.className = "raw-button";
        makeDefaultButtonEl.textContent =
            templateData.makeDefaultSearchEngineButton;
        makeDefaultButtonEl.onclick = function(e) {
          chrome.send('managerSetDefaultSearchEngine', [engine['modelIndex']]);
        };
        // Don't select the row when clicking the button.
        makeDefaultButtonEl.onmousedown = function(e) {
          e.stopPropagation();
        };
        urlWithButtonEl.appendChild(makeDefaultButtonEl);
      }

      // Do final adjustment to the input fields.
      this.nameField_ = nameEl.querySelector('input');
      // The editable field uses the raw name, not the display name.
      this.nameField_.value = engine['name'];
      this.keywordField_ = keywordEl.querySelector('input');
      this.urlField_ = urlEl.querySelector('input');

      if (engine['urlLocked'])
        this.urlField_.disabled = true;

      if (this.isPlaceholder_) {
        this.nameField_.placeholder =
            localStrings.getString('searchEngineTableNamePlaceholder');
        this.keywordField_.placeholder =
            localStrings.getString('searchEngineTableKeywordPlaceholder');
        this.urlField_.placeholder =
            localStrings.getString('searchEngineTableURLPlaceholder');
      }

      var fields = [ this.nameField_, this.keywordField_, this.urlField_ ];
        for (var i = 0; i < fields.length; i++) {
        fields[i].oninput = this.startFieldValidation_.bind(this);
      }

      // Listen for edit events.
      this.addEventListener('edit', this.onEditStarted_.bind(this));
      this.addEventListener('canceledit', this.onEditCancelled_.bind(this));
      this.addEventListener('commitedit', this.onEditCommitted_.bind(this));
    },

    /** @inheritDoc */
    get currentInputIsValid() {
      return !this.waitingForValidation_ && this.currentlyValid_;
    },

    /** @inheritDoc */
    get hasBeenEdited() {
      var engine = this.searchEngine_;
      return this.nameField_.value != engine['name'] ||
             this.keywordField_.value != engine['keyword'] ||
             this.urlField_.value != engine['url'];
    },

    /**
     * Called when entering edit mode; starts an edit session in the model.
     * @param {Event} e The edit event.
     * @private
     */
    onEditStarted_: function(e) {
      var editIndex = this.searchEngine_['modelIndex'];
      chrome.send('editSearchEngine', [String(editIndex)]);
      this.startFieldValidation_();
    },

    /**
     * Called when committing an edit; updates the model.
     * @param {Event} e The end event.
     * @private
     */
    onEditCommitted_: function(e) {
      chrome.send('searchEngineEditCompleted', this.getInputFieldValues_());
    },

    /**
     * Called when cancelling an edit; informs the model and resets the control
     * states.
     * @param {Event} e The cancel event.
     * @private
     */
    onEditCancelled_: function() {
      chrome.send('searchEngineEditCancelled');

      var engine = this.searchEngine_;
      if (this.isPlaceholder_) {
        this.nameField_.value = '';
        this.keywordField_.value = '';
        this.urlField_.value = '';
      } else {
        // The name field has been automatically set to match the display name,
        // but it should use the raw name instead.
        this.nameField_.value = engine['name'];
      }
      this.currentlyValid_ = !this.isPlaceholder_;
    },

    /**
     * Returns the input field values as an array suitable for passing to
     * chrome.send. The order of the array is important.
     * @private
     * @return {array} The current input field values.
     */
    getInputFieldValues_: function() {
      return [ this.nameField_.value,
               this.keywordField_.value,
               this.urlField_.value ];
    },

    /**
     * Begins the process of asynchronously validing the input fields.
     * @private
     */
    startFieldValidation_: function() {
      this.waitingForValidation_ = true;
      var args = this.getInputFieldValues_();
      args.push(this.searchEngine_['modelIndex']);
      chrome.send('checkSearchEngineInfoValidity', args);
    },

    /**
     * Callback for the completion of an input validition check.
     * @param {Object} validity A dictionary of validitation results.
     */
    validationComplete: function(validity) {
      this.waitingForValidation_ = false;
      // TODO(stuartmorgan): Implement the full validation UI with
      // checkmark/exclamation mark icons and tooltips showing the errors.
      if (validity['name']) {
        this.nameField_.setCustomValidity('');
      } else {
        this.nameField_.setCustomValidity(
            templateData.editSearchEngineInvalidTitleToolTip);
      }

      if (validity['keyword']) {
        this.keywordField_.setCustomValidity('');
      } else {
        this.keywordField_.setCustomValidity(
            templateData.editSearchEngineInvalidKeywordToolTip);
      }

      if (validity['url']) {
        this.urlField_.setCustomValidity('');
      } else {
        this.urlField_.setCustomValidity(
            templateData.editSearchEngineInvalidURLToolTip);
      }

      this.currentlyValid_ = validity['name'] && validity['keyword'] &&
          validity['url'];
    },
  };

  var SearchEngineList = cr.ui.define('list');

  SearchEngineList.prototype = {
    __proto__: InlineEditableItemList.prototype,

    /** @inheritDoc */
    createItem: function(searchEngine) {
      return new SearchEngineListItem(searchEngine);
    },

    /** @inheritDoc */
    deleteItemAtIndex: function(index) {
      var modelIndex = this.dataModel.item(index)['modelIndex']
      chrome.send('removeSearchEngine', [String(modelIndex)]);
    },

    /**
     * Passes the results of an input validation check to the requesting row
     * if it's still being edited.
     * @param {number} modelIndex The model index of the item that was checked.
     * @param {Object} validity A dictionary of validitation results.
     */
    validationComplete: function(validity, modelIndex) {
      // If it's not still being edited, it no longer matters.
      var currentSelection = this.selectedItem;
      if (!currentSelection)
        return;
      var listItem = this.getListItem(currentSelection);
      if (listItem.editing && currentSelection['modelIndex'] == modelIndex)
        listItem.validationComplete(validity);
    },
  };

  // Export
  return {
    SearchEngineList: SearchEngineList
  };

});

/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

cr.define('options', function() {
  const OptionsPage = options.OptionsPage;

  /**
   * Encapsulated handling of a search bubble.
   * @constructor
   */
  function SearchBubble(text) {
    var el = cr.doc.createElement('div');
    SearchBubble.decorate(el);
    el.textContent = text;
    return el;
  }

  SearchBubble.decorate = function(el) {
    el.__proto__ = SearchBubble.prototype;
    el.decorate();
  };

  SearchBubble.prototype = {
    __proto__: HTMLDivElement.prototype,

    decorate: function() {
      this.className = 'search-bubble';

      // We create a timer to periodically update the position of the bubbles.
      // While this isn't all that desirable, it's the only sure-fire way of
      // making sure the bubbles stay in the correct location as sections
      // may dynamically change size at any time.
      var self = this;
      this.intervalId = setInterval(this.updatePosition.bind(this), 250);
    },

    /**
     * Clear the interval timer and remove the element from the page.
     */
    dispose: function() {
      clearInterval(this.intervalId);

      var parent = this.parentNode;
      if (parent)
        parent.removeChild(this);
    },

    /**
     * Update the position of the bubble.  Called at creation time and then
     * periodically while the bubble remains visible.
     */
    updatePosition: function() {
      // This bubble is 'owned' by the next sibling.
      var owner = this.nextSibling;

      // If there isn't an offset parent, we have nothing to do.
      if (!owner.offsetParent)
        return;

      // Position the bubble below the location of the owner.
      var left = owner.offsetLeft + owner.offsetWidth / 2 -
          this.offsetWidth / 2;
      var top = owner.offsetTop + owner.offsetHeight;

      // Update the position in the CSS.  Cache the last values for
      // best performance.
      if (left != this.lastLeft) {
        this.style.left = left + 'px';
        this.lastLeft = left;
      }
      if (top != this.lastTop) {
        this.style.top = top + 'px';
        this.lastTop = top;
      }
    }
  }

  /**
   * Encapsulated handling of the search page.
   * @constructor
   */
  function SearchPage() {
    OptionsPage.call(this, 'search', templateData.searchPageTabTitle,
        'searchPage');
    this.searchActive = false;
  }

  cr.addSingletonGetter(SearchPage);

  SearchPage.prototype = {
    // Inherit SearchPage from OptionsPage.
    __proto__: OptionsPage.prototype,

    /**
     * Initialize the page.
     */
    initializePage: function() {
      // Call base class implementation to start preference initialization.
      OptionsPage.prototype.initializePage.call(this);

      var self = this;

      // Create a search field element.
      var searchField = document.createElement('input');
      searchField.id = 'search-field';
      searchField.type = 'search';
      searchField.incremental = true;
      searchField.placeholder = localStrings.getString('searchPlaceholder');
      this.searchField = searchField;

      // Replace the contents of the navigation tab with the search field.
      self.tab.textContent = '';
      self.tab.appendChild(searchField);
      self.tab.onclick = self.tab.onkeypress = undefined;

      // Handle search events. (No need to throttle, WebKit's search field
      // will do that automatically.)
      searchField.onsearch = function(e) {
        self.setSearchText_(SearchPage.canonicalizeQuery(this.value));
      };

      // We update the history stack every time the search field blurs. This way
      // we get a history entry for each search, roughly, but not each letter
      // typed.
      searchField.onblur = function(e) {
        var query = SearchPage.canonicalizeQuery(searchField.value);
        if (!query)
          return;

        // Don't push the same page onto the history stack more than once (if
        // the user clicks in the search field and away several times).
        var currentHash = location.hash;
        var newHash = '#' + escape(query);
        if (currentHash == newHash)
          return;

        // If there is no hash on the current URL, the history entry has no
        // search query. Replace the history entry with no search with an entry
        // that does have a search. Otherwise, add it onto the history stack.
        var historyFunction = currentHash ? window.history.pushState :
                                            window.history.replaceState;
        historyFunction.call(
            window.history,
            {pageName: self.name},
            self.title,
            '/' + self.name + newHash);
      };

      // Install handler for key presses.
      document.addEventListener('keydown',
                                this.keyDownEventHandler_.bind(this));

      // Focus the search field by default.
      searchField.focus();
    },

    /**
     * @inheritDoc
     */
    get sticky() {
      return true;
    },

    /**
     * Called after this page has shown.
     */
    didShowPage: function() {
      // This method is called by the Options page after all pages have
      // had their visibilty attribute set.  At this point we can perform the
      // search specific DOM manipulation.
      this.setSearchActive_(true);
    },

    /**
     * Called before this page will be hidden.
     */
    willHidePage: function() {
      // This method is called by the Options page before all pages have
      // their visibilty attribute set.  Before that happens, we need to
      // undo the search specific DOM manipulation that was performed in
      // didShowPage.
      this.setSearchActive_(false);
    },

    /**
     * Update the UI to reflect whether we are in a search state.
     * @param {boolean} active True if we are on the search page.
     * @private
     */
    setSearchActive_: function(active) {
      // It's fine to exit if search wasn't active and we're not going to
      // activate it now.
      if (!this.searchActive_ && !active)
        return;

      this.searchActive_ = active;

      if (active) {
        var hash = location.hash;
        if (hash)
          this.searchField.value = unescape(hash.slice(1));
      } else {
          // Just wipe out any active search text since it's no longer relevant.
        this.searchField.value = '';
      }

      var pagesToSearch = this.getSearchablePages_();
      for (var key in pagesToSearch) {
        var page = pagesToSearch[key];

        if (!active)
          page.visible = false;

        // Update the visible state of all top-level elements that are not
        // sections (ie titles, button strips).  We do this before changing
        // the page visibility to avoid excessive re-draw.
        for (var i = 0, childDiv; childDiv = page.pageDiv.children[i]; i++) {
          if (active) {
            if (childDiv.tagName != 'SECTION')
              childDiv.classList.add('search-hidden');
          } else {
            childDiv.classList.remove('search-hidden');
          }
        }

        if (active) {
          // When search is active, remove the 'hidden' tag.  This tag may have
          // been added by the OptionsPage.
          page.pageDiv.classList.remove('hidden');
        }
      }

      if (active) {
        this.setSearchText_(this.searchField.value);
      } else {
        // After hiding all page content, remove any search results.
        this.unhighlightMatches_();
        this.removeSearchBubbles_();
      }
    },

    /**
     * Set the current search criteria.
     * @param {string} text Search text.
     * @private
     */
    setSearchText_: function(text) {
      // Toggle the search page if necessary.
      if (text.length) {
        if (!this.searchActive_)
          OptionsPage.navigateToPage(this.name);
      } else {
        if (this.searchActive_)
          OptionsPage.showDefaultPage();
        return;
      }

      var foundMatches = false;
      var bubbleControls = [];

      // Remove any prior search results.
      this.unhighlightMatches_();
      this.removeSearchBubbles_();

      // Generate search text by applying lowercase and escaping any characters
      // that would be problematic for regular expressions.
      var searchText =
          text.toLowerCase().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

      // Generate a regular expression and replace string for hilighting
      // search terms.
      var regEx = new RegExp('(' + searchText + ')', 'ig');
      var replaceString = '<span class="search-highlighted">$1</span>';

      // Initialize all sections.  If the search string matches a title page,
      // show sections for that page.
      var page, pageMatch, childDiv, length;
      var pagesToSearch = this.getSearchablePages_();
      for (var key in pagesToSearch) {
        page = pagesToSearch[key];
        pageMatch = false;
        if (searchText.length) {
          pageMatch = this.performReplace_(regEx, replaceString, page.tab);
        }
        if (pageMatch)
          foundMatches = true;
        for (var i = 0, childDiv; childDiv = page.pageDiv.children[i]; i++) {
          if (childDiv.tagName == 'SECTION') {
            if (pageMatch) {
              childDiv.classList.remove('search-hidden');
            } else {
              childDiv.classList.add('search-hidden');
            }
          }
        }
      }

      if (searchText.length) {
        // Search all top-level sections for anchored string matches.
        for (var key in pagesToSearch) {
          page = pagesToSearch[key];
          for (var i = 0, childDiv; childDiv = page.pageDiv.children[i]; i++) {
            if (childDiv.tagName == 'SECTION' &&
                this.performReplace_(regEx, replaceString, childDiv)) {
              childDiv.classList.remove('search-hidden');
              foundMatches = true;
            }
          }
        }

        // Search all sub-pages, generating an array of top-level sections that
        // we need to make visible.
        var subPagesToSearch = this.getSearchableSubPages_();
        var control, node;
        for (var key in subPagesToSearch) {
          page = subPagesToSearch[key];
          if (this.performReplace_(regEx, replaceString, page.pageDiv)) {
            // Reveal the section for this search result.
            section = page.associatedSection;
            if (section)
              section.classList.remove('search-hidden');

            // Identify any controls that should have bubbles.
            var controls = page.associatedControls;
            if (controls) {
              length = controls.length;
              for (var i = 0; i < length; i++)
                bubbleControls.push(controls[i]);
            }

            foundMatches = true;
          }
        }
      }

      // Configure elements on the search results page based on search results.
      if (foundMatches)
        $('searchPageNoMatches').classList.add('search-hidden');
      else
        $('searchPageNoMatches').classList.remove('search-hidden');

      // Create search balloons for sub-page results.
      length = bubbleControls.length;
      for (var i = 0; i < length; i++)
        this.createSearchBubble_(bubbleControls[i], text);
    },

    /**
     * Performs a string replacement based on a regex and replace string.
     * @param {RegEx} regex A regular expression for finding search matches.
     * @param {String} replace A string to apply the replace operation.
     * @param {Element} element An HTML container element.
     * @returns {Boolean} true if the element was changed.
     * @private
     */
    performReplace_: function(regex, replace, element) {
      var found = false;
      var div, child, tmp;

      // Walk the tree, searching each TEXT node.
      var walker = document.createTreeWalker(element,
                                             NodeFilter.SHOW_TEXT,
                                             null,
                                             false);
      var node = walker.nextNode();
      while (node) {
        // Perform a search and replace on the text node value.
        var newValue = node.nodeValue.replace(regex, replace);
        if (newValue != node.nodeValue) {
          // The text node has changed so that means we found at least one
          // match.
          found = true;

          // Create a temporary div element and set the innerHTML to the new
          // value.
          div = document.createElement('div');
          div.innerHTML = newValue;

          // Insert all the child nodes of the temporary div element into the
          // document, before the original node.
          child = div.firstChild;
          while (child = div.firstChild) {
            node.parentNode.insertBefore(child, node);
          };

          // Delete the old text node and advance the walker to the next
          // node.
          tmp = node;
          node = walker.nextNode();
          tmp.parentNode.removeChild(tmp);
        } else {
          node = walker.nextNode();
        }
      }

      return found;
    },

    /**
     * Removes all search highlight tags from the document.
     * @private
     */
    unhighlightMatches_: function() {
      // Find all search highlight elements.
      var elements = document.querySelectorAll('.search-highlighted');

      // For each element, remove the highlighting.
      var parent, i;
      for (var i = 0, node; node = elements[i]; i++) {
        parent = node.parentNode;

        // Replace the highlight element with the first child (the text node).
        parent.replaceChild(node.firstChild, node);

        // Normalize the parent so that multiple text nodes will be combined.
        parent.normalize();
      }
    },

    /**
     * Creates a search result bubble attached to an element.
     * @param {Element} element An HTML element, usually a button.
     * @param {string} text A string to show in the bubble.
     * @private
     */
    createSearchBubble_: function(element, text) {
      // avoid appending multiple ballons to a button.
      var sibling = element.previousElementSibling;
      if (sibling && sibling.classList.contains('search-bubble'))
        return;

      var parent = element.parentElement;
      if (parent) {
        var bubble = new SearchBubble(text);
        parent.insertBefore(bubble, element);
        bubble.updatePosition();
      }
    },

    /**
     * Removes all search match bubbles.
     * @private
     */
    removeSearchBubbles_: function() {
      var elements = document.querySelectorAll('.search-bubble');
      var length = elements.length;
      for (var i = 0; i < length; i++)
        elements[i].dispose();
    },

    /**
     * Builds a list of top-level pages to search.  Omits the search page and
     * all sub-pages.
     * @returns {Array} An array of pages to search.
     * @private
     */
    getSearchablePages_: function() {
      var name, page, pages = [];
      for (name in OptionsPage.registeredPages) {
        if (name != this.name) {
          page = OptionsPage.registeredPages[name];
          if (!page.parentPage)
            pages.push(page);
        }
      }
      return pages;
    },

    /**
     * Builds a list of sub-pages (and overlay pages) to search.  Ignore pages
     * that have no associated controls.
     * @returns {Array} An array of pages to search.
     * @private
     */
    getSearchableSubPages_: function() {
      var name, pageInfo, page, pages = [];
      for (name in OptionsPage.registeredPages) {
        page = OptionsPage.registeredPages[name];
        if (page.parentPage && page.associatedSection)
          pages.push(page);
      }
      for (name in OptionsPage.registeredOverlayPages) {
        page = OptionsPage.registeredOverlayPages[name];
        if (page.associatedSection && page.pageDiv != undefined)
          pages.push(page);
      }
      return pages;
    },

    /**
     * A function to handle key press events.
     * @return {Event} a keydown event.
     * @private
     */
    keyDownEventHandler_: function(event) {
      // Focus the search field on an unused forward-slash.
      if (event.keyCode == 191 &&
          !/INPUT|SELECT|BUTTON|TEXTAREA/.test(event.target.tagName)) {
        this.searchField.focus();
        event.stopPropagation();
        event.preventDefault();
      }
    },
  };

  /**
   * Standardizes a user-entered text query by removing extra whitespace.
   * @param {string} The user-entered text.
   * @return {string} The trimmed query.
   */
  SearchPage.canonicalizeQuery = function(text) {
    // Trim beginning and ending whitespace.
    return text.replace(/^\s+|\s+$/g, '');
  };

  // Export
  return {
    SearchPage: SearchPage
  };

});
/* ####################### */
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var AddLanguageOverlay = options.AddLanguageOverlay;
var AddStartupPageOverlay = options.AddStartupPageOverlay;
var AdvancedOptions = options.AdvancedOptions;
var AlertOverlay = options.AlertOverlay;
var AutoFillEditAddressOverlay = options.AutoFillEditAddressOverlay;
var AutoFillEditCreditCardOverlay = options.AutoFillEditCreditCardOverlay;
var AutoFillOptions = options.AutoFillOptions;
var BrowserOptions = options.BrowserOptions;
var ClearBrowserDataOverlay = options.ClearBrowserDataOverlay;
var ContentSettings = options.ContentSettings;
var ContentSettingsExceptionsArea =
    options.contentSettings.ContentSettingsExceptionsArea;
var CookiesView = options.CookiesView;
var FontSettings = options.FontSettings;
var ImportDataOverlay = options.ImportDataOverlay;
var InstantConfirmOverlay = options.InstantConfirmOverlay;
var LanguageOptions = options.LanguageOptions;
var OptionsPage = options.OptionsPage;
var PasswordManager = options.PasswordManager;
var PersonalOptions = options.PersonalOptions;
var Preferences = options.Preferences;
var ProxyOptions = options.ProxyOptions;
var SearchEngineManager = options.SearchEngineManager;
var SearchPage = options.SearchPage;

/**
 * DOMContentLoaded handler, sets up the page.
 */
function load() {
  // Decorate the existing elements in the document.
  cr.ui.decorate('input[pref][type=checkbox]', options.PrefCheckbox);
  cr.ui.decorate('input[pref][type=number]', options.PrefNumber);
  cr.ui.decorate('input[pref][type=radio]', options.PrefRadio);
  cr.ui.decorate('input[pref][type=range]', options.PrefRange);
  cr.ui.decorate('select[pref]', options.PrefSelect);
  cr.ui.decorate('input[pref][type=text]', options.PrefTextField);
  cr.ui.decorate('input[pref][type=url]', options.PrefTextField);
  cr.ui.decorate('#content-settings-page input[type=radio]',
      options.ContentSettingsRadio);

  var menuOffPattern = /(^\?|&)menu=off($|&)/;
  var menuDisabled = menuOffPattern.test(window.location.search);
  // document.documentElement.setAttribute('hide-menu', menuDisabled);
  // We can't use an attribute on the html element because of webkit bug
  // 12519. Instead, we add a class.
  if (menuDisabled)
    document.documentElement.classList.add('hide-menu');

  localStrings = new LocalStrings();

  OptionsPage.register(SearchPage.getInstance());

  OptionsPage.register(BrowserOptions.getInstance());
  OptionsPage.registerSubPage(SearchEngineManager.getInstance(),
                              BrowserOptions.getInstance(),
                              [$('defaultSearchManageEnginesButton')]);
  OptionsPage.register(PersonalOptions.getInstance());
  OptionsPage.registerSubPage(AutoFillOptions.getInstance(),
                              PersonalOptions.getInstance(),
                              [$('autofill-settings')]);
  OptionsPage.registerSubPage(PasswordManager.getInstance(),
                              PersonalOptions.getInstance(),
                              [$('manage-passwords')]);
  if (cr.isChromeOS) {
    OptionsPage.register(SystemOptions.getInstance());
    OptionsPage.registerSubPage(AboutPage.getInstance(),
                                SystemOptions.getInstance());
    OptionsPage.registerSubPage(LanguageOptions.getInstance(),
                                SystemOptions.getInstance(),
                                [$('language-button')]);
    OptionsPage.registerSubPage(
        new OptionsPage('languageChewing',
                        templateData.languageChewingPageTabTitle,
                        'languageChewingPage'),
        LanguageOptions.getInstance());
    OptionsPage.registerSubPage(
        new OptionsPage('languageHangul',
                        templateData.languageHangulPageTabTitle,
                        'languageHangulPage'),
        LanguageOptions.getInstance());
    OptionsPage.registerSubPage(
        new OptionsPage('languageMozc',
                        templateData.languageMozcPageTabTitle,
                        'languageMozcPage'),
        LanguageOptions.getInstance());
    OptionsPage.registerSubPage(
        new OptionsPage('languagePinyin',
                        templateData.languagePinyinPageTabTitle,
                        'languagePinyinPage'),
        LanguageOptions.getInstance());
    OptionsPage.register(InternetOptions.getInstance());
  }
  OptionsPage.register(AdvancedOptions.getInstance());
  OptionsPage.registerSubPage(ContentSettings.getInstance(),
                              AdvancedOptions.getInstance(),
                              [$('privacyContentSettingsButton')]);
  OptionsPage.registerSubPage(ContentSettingsExceptionsArea.getInstance(),
                              ContentSettings.getInstance());
  OptionsPage.registerSubPage(CookiesView.getInstance(),
                              ContentSettings.getInstance(),
                              [$('privacyContentSettingsButton'),
                               $('show-cookies-button')]);
  OptionsPage.registerSubPage(FontSettings.getInstance(),
                              AdvancedOptions.getInstance(),
                              [$('fontSettingsCustomizeFontsButton')]);
  if (!cr.isChromeOS) {
    OptionsPage.registerSubPage(LanguageOptions.getInstance(),
                                AdvancedOptions.getInstance(),
                                [$('language-button')]);
  }
  if (!cr.isWindows && !cr.isMac) {
    OptionsPage.registerSubPage(CertificateManager.getInstance(),
                                AdvancedOptions.getInstance(),
                                [$('show-cookies-button')]);
    OptionsPage.registerOverlay(CertificateRestoreOverlay.getInstance(),
                                CertificateManager.getInstance());
    OptionsPage.registerOverlay(CertificateBackupOverlay.getInstance(),
                                CertificateManager.getInstance());
    OptionsPage.registerOverlay(CertificateEditCaTrustOverlay.getInstance(),
                                CertificateManager.getInstance());
    OptionsPage.registerOverlay(CertificateImportErrorOverlay.getInstance(),
                                CertificateManager.getInstance());
  }
  OptionsPage.registerOverlay(AddLanguageOverlay.getInstance(),
                              LanguageOptions.getInstance());
  OptionsPage.registerOverlay(AddStartupPageOverlay.getInstance(),
                              BrowserOptions.getInstance());
  OptionsPage.registerOverlay(AlertOverlay.getInstance());
  OptionsPage.registerOverlay(AutoFillEditAddressOverlay.getInstance(),
                              AutoFillOptions.getInstance());
  OptionsPage.registerOverlay(AutoFillEditCreditCardOverlay.getInstance(),
                              AutoFillOptions.getInstance());
  OptionsPage.registerOverlay(ClearBrowserDataOverlay.getInstance(),
                              AdvancedOptions.getInstance(),
                              [$('privacyClearDataButton')]);
  OptionsPage.registerOverlay(ImportDataOverlay.getInstance(),
                              PersonalOptions.getInstance());
  OptionsPage.registerOverlay(InstantConfirmOverlay.getInstance(),
                              BrowserOptions.getInstance());

  if (cr.isChromeOS) {
    OptionsPage.register(AccountsOptions.getInstance());
    OptionsPage.registerSubPage(ProxyOptions.getInstance(),
                                AdvancedOptions.getInstance(),
                                [$('proxiesConfigureButton')]);
    OptionsPage.registerOverlay(new OptionsPage('detailsInternetPage',
                                                'detailsInternetPage',
                                                'detailsInternetPage'),
                                InternetOptions.getInstance());

    var languageModifierKeysOverlay = new OptionsPage(
        'languageCustomizeModifierKeysOverlay',
        localStrings.getString('languageCustomizeModifierKeysOverlay'),
        'languageCustomizeModifierKeysOverlay')
    OptionsPage.registerOverlay(languageModifierKeysOverlay,
                                SystemOptions.getInstance(),
                                [$('modifier-keys-button')]);
  }

  Preferences.getInstance().initialize();
  OptionsPage.initialize();

  var path = document.location.pathname;

  if (path.length > 1) {
    var pageName = path.slice(1);
    // Show page, but don't update history (there's already an entry for it).
    OptionsPage.showPageByName(pageName, false);
  } else {
    OptionsPage.showDefaultPage();
  }

  var subpagesNavTabs = document.querySelectorAll('.subpages-nav-tabs');
  for(var i = 0; i < subpagesNavTabs.length; i++) {
    subpagesNavTabs[i].onclick = function(event) {
      OptionsPage.showTab(event.srcElement);
    }
  }

  // Allow platform specific CSS rules.
  if (cr.isMac)
    document.documentElement.setAttribute('os', 'mac');
  if (cr.isWindows)
    document.documentElement.setAttribute('os', 'windows');
  if (cr.isChromeOS)
    document.documentElement.setAttribute('os', 'chromeos');
  if (cr.isLinux) {
    document.documentElement.setAttribute('os', 'linux');
    document.documentElement.setAttribute('toolkit', 'gtk');
  }
  if (cr.isViews)
    document.documentElement.setAttribute('toolkit', 'views');

  // Clicking on the Settings title brings up the 'Basics' page.
  $('settings-title').onclick = function() {
    OptionsPage.navigateToPage(BrowserOptions.getInstance().name);
  };
}

document.addEventListener('DOMContentLoaded', load);

window.onpopstate = function(e) {
  options.OptionsPage.setState(e.state);
};