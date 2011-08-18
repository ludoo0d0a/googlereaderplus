/*
 * Menu: Compressor
 * Key: M3+M
 * Kudos: Ludovic Valente
 * License: EPL 1.0
  * DOM: http://download.eclipse.org/technology/dash/update/org.eclipse.eclipsemonkey.lang.javascript
 * DOM: http://localhost/com.aptana.ide.scripting
 * OnLoad: main()
 */

include("lib/Compactor.js");

/**
 * main
 */
function main()
{
	var sourceEditor = editors.activeEditor;
	
	// make sure we have an editor
	if (sourceEditor === undefined)
	{
		showError("No active editor");
	}
	// make sure we have a JS editor
	else if (getLanguage() != "text/javascript")
	{
		showError("Can only compact JavaScript files");
	}
	// compact
	else
	{
		var lexemes = getLexemes();
	
		// make sure we have content
		if (lexemes !== null && lexemes !== undefined && lexemes.size() > 0) {
			// compact
			var compactor = new Compactor(lexemes, "text/javascript", sourceEditor.lineDelimiter);
			
			compactor.compact();
			
			// write text
			sourceEditor.applyEdit(0, sourceEditor.sourceLength, compactor.toString());
		}
	}
}
