//Google Aero!
//http://userstyles.org/styles/4096
//Oct 21 2009

//Google Aero! - Icon Pack
//http://userstyles.org/styles/11993
//Oct 21 2009.

GRP.aero = function() {	
	var css= '#ghead,#sbl,#fctr{opacity:1!important}#gbar{display:block!important;position:fixed!important;top:0!important;left:0!important;right:0!important;height:25px!important;z-index:1001!important;background:#F6F6FF!important;border-bottom:solid 1px #99C!important;cursor:default!important;overflow:hidden!important;margin:0!important;padding:0!important}#gbi{display:block!important;visibility:visible!important;position:relative!important;top:0!important;left:0!important;border:none!important}#gbar .gb1,#gbi .gb2{float:left!important;height:inherit!important;font:menu!important;color:#000!important;text-decoration:none!important;cursor:inherit!important;margin:3px 3px 0 5px !important;padding:2px 2px 2px 6px !important}#gbar .gb1:after,#gbi .gb2:after{content:""!important;margin:0 -6px 0 2px !important;padding:2px 4px 2px 0 !important}#gbar .gb1:hover,#gbi .gb2:hover{background:left no-repeat url(data:image/gif;base64,R0lGODlhyAATANUAAPv7/Pr6+/Pz9KOlqfr7/bi6vaKlqa2wtM3S2Ovw9uvx+O3z+auvs+nu86Omqefr7+Xp7eXo6/r8/vn7/fHz9e/x8/r7/Pn6+/j5+vX298zS1+Xp7MrR1vj7/e3w8q2ytbe7vfz9/fLz8/////7+/v39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAADIABMAAAb/QBPiMygaj8ikcslsOp/QqHRKrVqVmoJoxO16v+CweEwum8/otHrNbocPAlJpTq/b7/i8fs/v+/+AgYKDhHgOJAGJiouMjY6PkJGSk5SVlpeYmZqPhxien6ChoqOkpaanqKmqq6ytrq+kDiEZtLW2t7i5uru8vb6/wMHCw8TFug4AFMrLzM3Oz9DR0tPU1dbX2Nna29DIFd/g4eLj5OXm5+jp6uvs7e7v8OUOFh719vf4+fr7/P3+/wADChxIsKDBfQ4uRFjIsKHDhxAjSpxIsaLFixgzatzIMWLCDSBDihxJsqTJkyhTqlzJsqXLlzBjmkwIoabNmzhz6tzJs6fPup9AgwodSrSo0Z0JHyhdyrSp06dQo0qdSrWq1atYs2rdCtUBgQZgw4odS7as2bNo06pdy7at27dw45r1mqCu3bt48+rdy7ev37+AAwseTLiw4b0OJihYzLix48eQI0ueTLmy5cuYM2vezDnygQodFogeTbq06dOoU6tezbq169ewY8uefVoDCAoScuvezbu379/AgwsfTry48ePIkyv3bYIDAwPQo0ufTr269evYs2vfzr279+/gw1cPAgA7)!important}#gbar .gb1:hover:after,#gbi .gb2:hover:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAATANUAAPv7/Pr6+/Pz9PLy86Olqfr7/ayvtLi6vfj6/aKlqevw9uvx+O3z+evx96ywtKuvs+nu8+jt8ufr7+Xp7eXo6/r8/vHz9e/x8/r7/Pn6+/j5+vX298zS18vR1srQ1erw9ebr762xtOXp7Li7ve3w8vn7/Pj6+/T29/Hz9O/x8vz9/f////7+/v39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAAEABMAAAZCQEKI41oNDp0WS2AIBFgJjYZF2JxUBAsKQLhcuCQShkChZAgi0XkyOUtAJgIkUiAoPvVFo0RgIFIOFSgjHQkPHi5BADs=)!important}#gbar .gb1:focus,#gbar b.gb1,#gbi .gb2:focus,#gbi b.gb2{background:left no-repeat url(data:image/gif;base64,R0lGODlhyAATAOYAAJWxyCxiizpoikNzmUV1mkh3mpWyyJOwxpezyS9kijxujkR1k2aAkHiSok2LrkFzkVydwUh4lGKixWelyFB9mFOAmleCm3ix0G+On3KPoHWRoX6Von+VonqPm32RnLHM24aZpLXO3M7p+JGkr77S3bLEzsjX4Nrp8mOs02iz22223W213HK533i94m2qyn/C5YzK63600YK305PO7ZjR76jI2azK2sTl9snn99Ps+b7R27XGz93w+uHy++Dx+uX0/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEAALAAAAADIABMAAAf/gEAIBQGFhoeIiYqLjI2Oj5CRkpOUlZaKAAIMHiCdnp+goaKjpKWmp6ipqqusra6hBAwjOya1tre4ubq7vL2+v8DBwsPExca5AR0lJz/Nzs/Q0dLT1NXW19jZ2tvc3d7RARw6Pj3l5ufo6err7O3u7/Dx8vP09fbpARskPPz9/v8AAwocSLCgwYMIEypcyLBhwAANQuSYSLGixYsYM2rcyLGjx48gQ4ocSRJjAA0fRKhcybKly5cwY8qcSbOmzZs4c+rc+TJABhs4ggodSrSo0aNIkypdyrSp06dQo0o1GgBDjRtYs2rdyrWr169gw4odS7as2bNo03YNYEEGjbdw4OPKnUu3rt27ePPq3cu3r9+/gOkGqBBjhuHDiBMrXsy4sePHkCNLnky5suXLiwNQuACjs+fPoEOLHk26tOnTqFOrXs26tWvRASK4eEG7tu3buHPr3s27t+/fwIMLH068eO4ACya0WM68ufPn0KNLn069uvXr2LNr384deoAHEliIH0++vPnz6NOrX8++vfv38OPLn3+egAIIK1To38+/v///AAYo4IAEFmjggQgmqOCC/hmQgAMopCDhhBRWaOGFGGao4YYcdujhhyCGKOKIFgJxwACXpKjiiiy26OKLjAQCADs=)!important}#gbar .gb1:focus:after,#gbar b.gb1:after,#gbi .gb2:focus:after,#gbi b.gb2:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAATANUAAJWxyJezyixii0NzmT9tj0V1mkh3m5e0ypq2yzp0nXiQoGGp0WWq0oaZpKO5xs7p+MjX4Nrp8miz22223XK533i94n/C5YzK65PO7ZjR78Tl9snn99Ps+d3w+sXV3eHy++Dx+uX0/OTz+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAAAEABMAAAY7QIEBMWooCAeIx1EIiSKCzwck6FgFnKzgwRVsvgKNWJApCzBowWUtsLgFlbiAQhdMJoyCZJEICAYAI0EAOw==)!important}#gbar .gb1:active,#gbar b.gb1:hover,#gbi .gb2:active,#gbi b.gb2:hover{background:left no-repeat url(data:image/gif;base64,R0lGODlhyAATAOYAAEJxl5Ktwyxiiztpi0RzmEZ1mY+swo2qwJCswjVojWyCkdLb4V+GnmaKoGmLoYSXo4aYo8fV3snW3r/K0VJ/mVqEnW+hv12FnYS302SJn5PK6Ii61prS8Yy814++2JbB2ZrD2q/d9p7F27Pf92uDkbjh+IKTnYiapIeZo4mapIycpZinsMTU3ej0+8/a4M3Y3uv1+5zU8ZvT8J/V8qPX86fZ9IKXooOUncvY377K0OXz+u33/PL6/vH5/ejw9PT7/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEAALAAAAADIABMAAAf/gEABBQKFhoeIiYqLjI2Oj5CRkpOUlZaKCAMkNyqdnp+goaKjpKWmp6ipqqusra6hBAorEwu1tre4ubq7vL2+v8DBwsPExca5AiY5Pj/Nzs/Q0dLT1NXW19jZ2tvc3d7RAicvPTzl5ufo6err7O3u7/Dx8vP09fbpAikuPfz9/v8AAwocSLCgwYMIEypcyLBhQAEocOyYSLGixYsYM2rcyLGjx48gQ4ocSRKjAAgSYKhcybKly5cwY8qcSbOmzZs4c+rc+VLAgwgtggodSrSo0aNIkypdyrSp06dQo0o1KsAGCx1Ys2rdyrWr169gw4odS7as2bNo03YV4EBEibdw4OPKnUu3rt27ePPq3cu3r9+/gOkKaABihOHDiBMrXsy4sePHkCNLnky5suXLiwVk+BCis+fPoEOLHk26tOnTqFOrXs26tWvRAhh4qEG7tu3buHPr3s27t+/fwIMLH068eG4BFzrQWM68ufPn0KNLn069uvXr2LNr384duoAKG2aIH0++vPnz6NOrX8++vfv38OPLn3+eAAUMMmLo38+/v///AAYo4IAEFmjggQgmqOCC/hmQgAUacCDhhBRWaOGFGGao4YYcdujhhyCGKOKIFgJxAACXpKjiiiy26OKLjAQCADs=)!important}#gbar .gb1:active:after,#gbar b.gb1:hover:after,#gbi .gb2:active:after,#gbi b.gb2:hover:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAATANUAACxii0Fxl0NzmEZ1mYuov42qwY2qwI+rwUV8okBuj9Lb4ay9yIzE5I3E45rS8a/d9rPf97jh+H6UoIycpej0+8/Z3+v1+5zU8Z/V8qPX86fZ9OXz+u33/PL6/vH5/ejw9PT7/vP6/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACIALAAAAAAEABMAAAY7QMDgIJpIEgZFZSEAhT6ATscD8FgBnCzAwgVQvoCNGBApAyBowGMN0LgBmTgAQwdcLg2Bg4EoAAIEIkEAOw==)!important}#guser,div.gaiaNav,div.sites-account,#sft .xsm,#ap,p.gseaopt,td.bN.bR {display:block!important;position:fixed!important;top:26px!important;right:0!important;z-index:1002!important;height:0!important;cursor:default!important;margin:0!important;padding:30px 6px 0!important}#guser,div.gaiaNav,div.sites-account{left:0!important;border-bottom:solid 1px #0C3942!important}div.gaiaNav{overflow:hidden!important}#guser nobr{position:relative!important;top:15px!important}#ap{right:-9px!important}p.gseaopt{width:auto!important}#guser nobr > a,div.gaiaNav a,#sft .xsm a,#ap a,p.gseaopt a,td.bN.bR span.toxOdd,#guser nobr .gb4, #guser nobr .offline-status, #offline-status-marker{float:left!important;position:relative!important;font:small-caption!important;color:#FFF!important;text-decoration:none!important;text-shadow:1px 1px 3px #000!important;cursor:inherit!important;margin:0 4px 0 0 !important;padding:4px 4px 5px 8px !important}#guser nobr > a,div.gaiaNav a{top:-43px!important}#sft .xsm a,p.gseaopt a,td.bN.bR span.toxOdd{top:-27px!important}#ap a{top:-40px!important}#guser nobr > a:before,div.sites-account a:before,div.gaiaNav a:before,#sft .xsm a:before,#ap a:before,p.gseaopt a:before,td.bN.bR span.toxOdd:before{display:inline-block!important;vertical-align:top!important;margin:0 6px -4px -2px !important}#guser nobr > a:after,div.sites-account a:after,div.gaiaNav a:after,#sft .xsm a:after,#ap a:after,p.gseaopt a:after,td.bN.bR span.toxOdd:after{content:""!important;margin:0 -8px 0 4px !important;padding:4px 4px 5px 0 !important}#guser nobr > a:active,div.sites-account a:active,div.gaiaNav a:active,#sft .xsm a:active,#ap a:active,p.gseaopt a:active,td.bN.bR span.toxOdd:active{background:left no-repeat url(data:image/gif;base64,R0lGODlhQAEYAOYAABhjcAklKgsmKx5hbCBjbipqdR89QkyOmRw0OB01OR82OiE3O1Z+hWOQmDRLT1+Hjll9gzpPUy4/Ql15fhdjbxdjbhhkcBpmcQomKhxocx5pdB1hayJrdiJsdiFlbw0nKyZueSZveSNmcA4oLCdochAqLixyfSxzfTF3gRY1OidcZC9veChdZSpgaCpfZyldZDRyfCxhaTp+iC9iajJkbDhveEiMl0iNlzZnb0yPmTVjakmGj1CRm0yIkVSTnE+Kk1eTnFOMlUp6gVuUnVuVnUx7giM5PFeMlE99hF6UnFqNlSU6PVuMlFJ+hGGTmic7PlR+hGORmF+Mkik8P1h+hFp9gl2AhVx+g1p6fzdKTVRvc116flVvcxdkbh5qdDF4gSddZDp/iB09QRgyNTBjaRs0N1SUnFeUnGCHjP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGkALAAAAABAARgAAAf/gGlWERKFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5QQWVwToaKjpKWmp6RbqKsTqqynrq+tsqm0sbSit7iouri9vLuhv6bDr8Wsx6sOWldozs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+TdU1gPDerr7O3u7/DtUfH0DfP18Pf49vvy/fr91gEMGG9gQIMFCapD+I4hPof1INJ7UkWKk4sYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKlySVUmCSZSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkwo1wkDJkKdQo0qdSrWqVCJWsw7BqrUq165bwV4V+1Us1LJmraI1u1Zt2qdt/6nG7TpXa92sC6AcAcK3r9+/gAML/ntmsGEghQ8LTqwYcWPCjxk/7it58uDKkzFftsxXc2DPikEfFm1YQZMgPlKrXs26tevXrM3Anu1DNu3Xtm/X1h2bd27eqn8Dhy0ceHHiw1Mfd738dnPaz2cnQPKDh/Xr2LNr3869u/fv4MOLH0++vPnz6NOrX8++PIIiPQ7In0+/vv37+OvnyM//wP7++P0HoH8D6leggAXOh2CC+S2YoIMNMigfhPdRCKCF/WHIXxlC7GDDhyCGKOKIJJYo4g0mpmgDiiqWyGKLK8J4oowvyghijTaaiKONO+qY44c9khhki0OqWGSKAYCxQf8FTDbp5JNQRinlk11MaWUFVV4pZZZaYtkllV9y+WWTYo45ZZljonmmmUyqGaWbWsJ5pZxWBqDCBhTkqeeefPbp55+ABirooIQWauihiCaq6KKMNuroo4gGwMIAAFRq6aWYZqrppphawOmnAHgK6qaijhqqqZ2iWiqqlq7KKqeushorrK9WOqumt46aK6i7foqBCwRcIOywxBZr7LHIJqvsssw26+yz0EYr7bTUVmvttdhGi0ELHmTg7bfghivuuOSWa+656Kar7rrstuvuu/DGK++89LYrQAwiaKDvvvz26++/APfrRcAEazBwwQAfjLDBCwvcsMIN7wtxxAFPHLH/xRVTrC/G/3KMsMcFg0zwBzOQwMHJKKes8sost6xyBy7HzAHMMrdMc80z4/yyzjfrjHLPPrsMtM9DCx30yUWznHTNS8vcdMwj0FAACFRXbfXVWGet9dUhbO01CF1/rXXYYoNdNtdnk3121WqvvXXba8P9tttUy5213WLj/bXeXpeAwwomBC744IQXbvjhhJ+A+OImKM744Y4/3rjkiVMeOeWCX4454ppj3jnnmwf+ueGjP14646cvnoIOMKDg+uuwxy777LTH/kXtuKNwe+6078677r/bHrzvwb9OfPG1H1+88skj7zrzs0PPu/S5U4/7CwbUIMP23Hfv/ffgh+99Uhjily8D+eaHj37657M/vvvru899/PKLT7/899tf//b5g99/+v8zXwDLlwYyiGEMCEygAhfIwAY68IEQjKAEJ0jBClrwghjMoAY3yMEOevCCgQAAOw==)!important;padding:5px 3px 4px 9px !important}#guser nobr > a:active:after,div.sites-account a:active:after,div.gaiaNav a:active:after,#sft .xsm a:active:after,#ap a:active:after,p.gseaopt a:active:after,td.bN.bR span.toxOdd:active:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAAYAOYAAAklKh01OSE3OzpPUy4/QhdjbxdkbxhkcAkmKhhjbxpmcRpkbwomKhtlcBxocwsnKx5ociJsdiJqdQ0nKyZveSZueA4oLCtyfBAqLixzfTF3gSldZDR0fR1BRkiNl0yPmVCRm1uVnSM5PF6UnCU6PWGUm2KUm2GTmic7PmSTmmORmCk8P1l+g12AhV16flVvcxdkbh5qdDF4gRY2Ojp/iB09QRgyNTBjaRs0Nxw1OB83OlSUnFeUnDRMT2CIjWCHjDNFR1Jucf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEIALAAAAAAEABgAAAdagAQDLUIuL0AsPz5BPSopKisnJiUoI5YkIZkiPJwCO586IKIBH6U5Hqg4MAYGCAWvAAcJCQAKCwsMDg0NDDEQEA8REhITFBUVFhkXFxgyGhozNBwdGzY1N0KBADs=)!important;margin:0 -7px 0 3px !important;padding:5px 3px 4px 1px !important}#gbs{display:none}#guser #gbg{left:200px!important;top:57px!important;right:auto!important;border:solid 1px #979797!important;background:#F0F0F0 repeat-y 28px url(data:image/gif;base64,R0lGODlhAgABAIAAAOLj4////ywAAAAAAgABAAACAkQKADs=)!important;-moz-box-shadow:4px 4px 2px -2px #8F8F8F!important;padding:1px 2px!important}#guser #gbg .gb2{font:menu!important;color:#000!important;margin:0 4px 0 0 !important;padding:3px 4px 4px 36px !important}#guser #gbg .gb2:before{margin:0 15px -1px -31px !important}#guser #gbg .gb2:after{display:inline-block!important;width:4px!important;height:15px!important;float:right!important;content:""!important;margin:-3px -8px -4px 0 !important;padding:3px 0 4px!important}#gb,#guser,div.sites-account,div.gaiaNav{background:teal repeat-x url(data:image/gif;base64,R0lGODlhAQAeAMQAAGmlr7fU2RhqdxhrdxlqdxtseB1teR9ueiNwfCdzfy14gzN8hzuEj0uUn0+WoVOZo1mcpl2eqGOirG6psXSstXmvt36yuoO1vIe4v4u6wUSOl02ZoVelq5rMzwAAAAAAACwAAAAAAQAeAAAFGGCQYZdVURMgRdDjNINAFMaBJMrCaBvXhQA7)!important}#guser nobr > a:focus,div.sites-account a:focus,div.gaiaNav a:focus,#sft .xsm a:focus,#ap a:focus,p.gseaopt a:focus,td.bN.bR span.toxOdd:focus{background:left no-repeat url(data:image/gif;base64,R0lGODlhQAEYAOYAABlOVxxQWSZbZEyHkU6IkkRze2mlr0lzeniut3iWm6DEyqXJzxFKUxFLUxlqdxlrdxpqdxprdxJKUxxseBRLVBRMVB1teRZNVSBueiBveiRwfCRxfChzfyh0fy54gy55gyBUWzN8hzN9hzNye0yUn0yVnzVnb1CWoVCXoThpcFSZoztrckyIkD5tdFmcplKNllCKk16eqF6fqFWOl0JudVmRmmSirGSjrFyWnkZxeFyUnV2VnWmmr2CYoGObpE12fG+psWuiqnWstXWttVJ4flmBh3mvt32xuW6aoIK0vFt+g2GGi3Kdo4e4v426wZO+xZnCyKbKz6XHzK7O0xlsdzt6gjNobzBjaVmdpmujqnmwt5/Gy67P0zBkaf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF4ALAAAAABAARgAAAf/gF5MS0qFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5RICVJToaKjpKRcXKWppaiqrVOsrqmwsbS1tq+3o7O0u7a9tb+5wr7DuMPBRQpRRszNzs/PWlrQ1NDT1dhG19nU29zf4OHa4s7e3+bh6ODq5O3p7uPu7EQLQvb3+Pn6Q0P6/vv/AtrrJ/AfwYIIEyocuBDfwYQPF0ZUOLGhRYkXhVREuPHHFiAgQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmTZgHoBjYybOnz588ePwcCpSo0Z1CjxJNqrSp06dIofZk6pQqVKtPsUrdepWrAa1NweZ4YqOs2bNo0964kbatWrdw/8uyjet2Lt27ePPK1XvWLl6/egHnFcy3cGDDNgjfVUzDSYzHkCNLnixDxuTLlDFrfmx5M+bOnkOLHs2ZdGTQolGTVj2atenXq2HHcB2adosmLnLr3s27NxYsvYP7Fk48N/Diwo8jX868uXHnu5Uzl+6cenPr0LNX1+4C+3LvK5KoGE++vPnz6NOrX8++vfv38OPLn0+/vv37+PPPT3HkhP//AAYoIAooCGjggAcm6F+BCh7IYIMQRijhghMC+GCEF06YoYQbVuihhh+e0CGEI5qAAAkopqjiiiyWUAKLMLYY44wovkhjjDbeqOOOPNbYo4o57hhkj0PyWOSPSBKZJP8JR+rYZAMsPCDllFRWaSUVVFip5ZVbdillll5uCWaYZJZp5pdnUjlmmWue2aaZb6Ypp5tzPhAnmXcyMIADfPbp55+ASgnooIESaiifDxxqaKKKNuroo30yCimik0pa6aSRYqrpppZC2umjn/IpAQEQlGrqqaimGkEEqbaqqquwlspqrK7OSuutuOYqq66n2oqrr7oCm6uwvBYbrLEQEHurshTAMMGz0EYr7bTUVmvttdhmq+223Hbr7bfghivuuOSW+20FL1ig7rrstuvuu/DGK++89NZr77345qvvvvz26++/AOt7wQwYFGzwwQgnnEEGCTessMMQF8xwxA5PTPH/xRhnLLHGB1uMsccag5yxyByXHLLJGJB8scoA1KDByzDHLPPMG2ww880046zzyzbvjHPPPgct9NA8Ex0z0EIjTbTSQzNt9NNLQ62B00FTHYAOHGSt9dZcd91BB12H7bXYZGcNdtlin4322my3bbbbW6vNttxu09223XDnXbfeHOC9tt8g9ODB4IQXbvjhH3xw+OKIM+744Io/znjkkldu+eWQY1445ZZzjrnnl4Ou+eifk+6B6JWjLsAOOITg+uuwxx67CCLIbrvstd+uewi57257774HL/zwvBMPO/DBIz+88sIzb/zzy0NfPPTOj1CAD0Fkr/323HOfRRbdh989Yfjilx8E+eaHj3767Lfv/vnvb78++/O7X3/798evv/37w79//l6oghWuQMACGvCAB+xCFxDIQAQusIEQvMIDI8jACVLwghjMoAQ1aEALXtCDGQQhBkXIwRKG0IQbNCEJAwEAOw==)!important}#guser nobr > a:focus:after,div.sites-account a:focus:after,div.gaiaNav a:focus:after,#sft .xsm a:focus:after,#ap a:focus:after,p.gseaopt a:focus:after,td.bN.bR span.toxOdd:focus:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAAYAOYAAKXJzxFLUxlrdxprdxJLUxxseBRLVBRMVB1teRZNVSBvehlPVyRxfCh0fxxRWS55gyBUWzN9hyZcZEyVnzVob1CXoThpcFSZoztrckyIkUyIkE6JklKNllCKk0R0e16fqFWPl0JvdVmSmmSjrEZyeFyUnWmmr0l0emOcpE12fG+psXWttXivt26aoIK0vFt+g2GGi3Kdo4e4v5O/xZnCyKDFyqbKz6XHzBlsdzNzezt7gjNpbz5udFmdplyXnl2WnWCZoGujqlJ5flmCh3mwt32yuY27wXiXm5/Gy67P0zBkaf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAEABgAAAdigC8wMUtJN0ctRDY1QysrAEIqKkgpJiY0JyMjMyQfH0YhPT0yPBcXLhgVFUUWExMsFDg4GgECAhkBAwMbBAUFHQYICBwHCgogCQwMIgsNDSUODw9AEBE+PxJBKB45Sjs6S4EAOw==)!important}#guser nobr > a:hover,div.sites-account a:hover,div.gaiaNav a:hover,#sft .xsm a:hover,#ap a:hover,p.gseaopt a:hover,td.bN.bR span.toxOdd:hover{background:left no-repeat url(data:image/gif;base64,R0lGODlhQAEYAPcAABlOVxxQWSZbZERze0lzepG6wY2xt3iWm6TIzqzL0cLa3sje4tLk58na3dTl6BFKUxFLUxJKUxRLVBRMVBZNVSdrdidsdidrdSlteClueCBUWyxxey1zfTF2gTF3gTR4gzR5gzh8hzh9hzNyezyAikCEjjVnbzhpcDtrcj5tdEJudUZxeGOepmefqGegqE12fGqiqm6krFJ4flmBh3mqsnmrsm6aoFt+g2GGi3Kdo4azuoSvtn+lq5G7wYeutIGmrIarsYSpr420upC1u5O4vp/DyKnM0azM0a/P1LXT17bT17vW2s7i5dzq7CdsdTyBikCFjjt6gjNobzBjaW6lrH6kqYmvtJrAxcfa3DBkaf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFoALAAAAABAARgAAAj/ALXkwHGjoMGDCBMqXMiwocOHECNKnEixosWLGDNq3EjRxoEGTUKKHEmypMmTKFOqXMmypcuXMGPKnEmzps2bMGdgYaCkp8+fQIMKHUq0qNGjSJMqXcq0qdOnUKNKncpUhoMEWLNq3cr1yBGuYLuGHYv1K9mwZs+qVZt2bdu1ZeHKfQuXrty7dsfmPbuXbN+tL5gUGUy4sOHDiBMrXsy4sePHkCNLnky5suXLmDNPJrCggOfPoEOL7tFDtOnRp1N7Lq36NOvWsGG/jj079mrbuGvb1o27N+/Uv1sHVz089AoFOpIrX868ufPn0KNLn069uvXr2LNr3869u/fv2VUs/6FBvrz58+hr1EDPPn379+TXw28vf759+/Xv578fn7///fwB6N+AAr5X4HwHwpfgeSkkEcODEEYo4YRUUDHhhRRiqOGDFm6IYYcehhgiiCKSKCKHJ6Zo4okrpuhiixrC6KGMG9IoIQpIwKDjjjz26OOPQAYp5JBEFmnkkUgmqeSSTDbp5JNQKnmCES1UaeWVWGbpggtZdqmll2BWyWWYXo5J5plnmommmmiK2eabbLYZ55t0zgmmnWTiGaaeWJqAAAuABirooIQWauihiCaq6KKMNuroo5BGKumklFZqKaQQVHHBppx26umnTjjx6aigkmrqpqKeSmqqqrbaKquuwv/qKqqz1irrrLfWqmuupvKqqq+nAuvpAzxUYOyxyCarrAUWKOvsss9Ga2yz0j5LbbXYYntttttmO6234HbrrbjglktutOdWm6606yYbwQ8YxCvvvPTWm0EG9eZrr778xotvv/r+C/DAAwtMsMEE+5vwwggn3PDCED/Mr8QAU9yvxfRKEMQGHHfs8ccghyzyyCSXbPLJKKes8sost+zyyzDHLDPLEwDBwc0456zzzjz37PPPQAct9NBEF2300UgnrfTSTDd9NAVWdCD11FRXbbUHHlit9dVbdy111l5vDXbYZJM9dtlnl/212mynrbbbbMcNd9dzh12313dXDYABH/T/7fffgAcOAgiBFy644Yj3TXjihi/O+OOPOw655JArXvnllFee+eWcb46454yDnrjogAcwRAiop6766qyLIALrsLce++yov0577Lbfrrvuue/e++61Ay/878ATL/zxxs+e/O3L09786hoQQcL01Fdv/fVPPHH99thz7/302n/Pffjil18++eajbz7467ev/vrvty9//N7TL7793+NvvQA+7FDC/wAMoAAFCAUoDPCAAzQgAhdYAgUy8IAOfKAEHxhBCVZwgg3EoAYvOEEOanCDH/QgBT8IQBEOcAQDEMIVVsjCFrrwhTCMoQxnSMMa2vCGOMyhDnfIwx768IdADKIOPrUQBSlM4YhITKISlZiFLCzxiUt0IhSnOAUpUvGJVryiFq+YRS12cYtVBKMYv7hFMopxjGc0IxfPiEQ1LjEgADs=)!important}#guser nobr > a:hover:after,div.sites-account a:hover:after,div.gaiaNav a:hover:after,#sft .xsm a:hover:after,#ap a:hover:after,p.gseaopt a:hover:after,td.bN.bR span.toxOdd:hover:after{background:right no-repeat url(data:image/gif;base64,R0lGODlhBAAYAOYAANLk5xFLUxJLUxRLVBRMVBZNVRlPVxxRWSdsdilueCBUWyxxey1zfTF3gSZcZDR5gzh9hzVobzhpcDtrckR0e0JvdUZyeGOepkl0emegqE12fGqiqnmrsm6aoFt+g2GGi3Kdo4azuoSwtn+lq5G7wYGmrIarsYSpr420upC1u42yt6TJzp/DyKnM0azM0a/P1LXT17bT17vW2s7i5dzq7CdsdTNzezyBikCFjjt7gjNpbz5udG6lrFJ5flmCh36kqYevtImvtJO5vniXm5rAxcLb3sjf4sfa3Mnb3dTm6DBkaf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAEABgAAAdigB4fIEs0SEMdMQBHPi4uST0sLDMaJCRGGCEhRRYcHDIVPDwwOxsbLxMZGS0SFxcrETU1PwEICCMBCQklAgsLJwMMDCYEDQ1BBQ8PKgYQECkHNzdCCjgiQA5EKBQ2Sjo5S4EAOw==)!important}#guser #gbg .gb2:hover{background:no-repeat url(data:image/gif;base64,R0lGODlhkAEWAOYAAOv3/+Lu9uHt9e74/+Xv9uTu9dzs9tvr9eX1/9jl7dvm7e34/+Tv9uPu9dHj7drs9tnr9dLj7eP1/9vs9trr9eT1/93t9tzs9eb2/+n3/+Du9t/t9drm7ez4/+Pv9uLu9dzn7e/5/+bw9uXv9fP6/urx9enw9Nbq9NDj7dLk7dPk7dzt9tvs9eX2/93t9ef3/97u9tbl7er4/+Hv9uDu9dnm7eDo7NTl7dfm7ePu86jY67Db7L3f7crj7d3t9ODu9Lvf7crk7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEIALAAAAACQARYAAAf/gEJBOzqFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnpY9PDklJqWmp6ipJjYkqq6vsLGys7S1tre4ubq7vL2+v8DBtTs/IiIjyMnKy8wjICHN0dLT1NXW19jZ2tvc3d7f4OHi4+TYOsbH3s/l7O3u7/Dx8vP09dI6BPkF+/z9/v8FFAwASLCgwYMIEypcyLChw4cQI0qcSLGixYsL8emLKBCjx48gQ4ocSbKkyZMFdTBY2aCly5cwYzbgsECmzZs4c+rcybOnz59AgwodSrSo0aNIk/bU4aHph6dQo0qd+qFGB6pYs2rdyrWr169gw4odS7as2bNo06pd+1VHgLcC/+LKnUu3roAEAOzq3cu3r9+/gAMLHky4sOHDiBMrXsy4cWAdMyLTmEy5suXLNHDIwMy5s+fPoEOLHk26tOnTqFOrXs26tevXo3VomL2htu3buHNviJFBt+/fwIMLH068uPHjyJMrX868ufPn0KMXl017OW/p2LNr3869u/fv4MP/pq6B+XXx6NOrX8++vXvtOmDId0G/vv37+F3ceJG/v///AAYo4IAEFmjggQgmqOCCDDbo4IMQEqiDBRReYOGFGGao4QUqYLDhhyCGKOKIJJZo4okopqjiiiy26OKLMMYoo4k6rGAjCzjmqOOOPLKQQgs9BinkkEQWaeSRSCap5M2STDbp5JNQRinllFQiqYMBWB6g5ZZcdunlAREg8OWYZJZp5plopqnmmmy26eabcMYp55x01mmnmjpMoCcFfPbp55+AUuBABYEWauihiCaq6KKMNuroo5BGKumklFZq6aWYMprnnpIOmumnoIYq6qiklmrqqagausMJDzwAwauwxirrrBCgIAGtuOaq66689urrr8AGK+ywxBZr7LHIJqvssr/2AIQPHphlFVvUVmvttdhmq+223HablRA9EPLJuOSWa+656Kar7rrsnhsIADs=)!important}#guser #gbg .gb2:hover:after{background:no-repeat url(data:image/gif;base64,R0lGODlhBAAWAMQAAOHt9eTu9dvr9ePu9dnr9drr9dzs9d/t9eLu9eXv9enw9Nbq9Nvs9d3t9eDu9ePu86jY66/a67zf7crj7d3t9ODu9Lrf7f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABcALAAAAAAEABYAAAU2IBRNl/JIU5JUkZpAQQzLQw0hOATskONDhyBQGDxAGkiIYQlhOCGCKKRAnVYJhEUEQbFMRKQQADs=)!important}body[onload=sf()]{padding-top:80px!important}body[onload=rpv();]{padding-top:40px!important}body#editpage{padding-top:0!important}.gbh,#gbar a.gb3,#gbi div.gb2,#sft .xsm br,#ap br,p.gseaopt br,td.bN.bR br{display:none!important}#gbar a:focus,#guser a:focus,div.sites-account a:focus,#sft .xsm a:focus,#ap a:focus,p.gseaopt a:focus,td.bN.bR span.toxOdd:focus{outline:none!important}td.bN.bR span[role=link],#guser u{text-decoration:none!important}body[topmargin=3],#doc3,body > div > div > div.nH,body{padding-top:56px!important}';
	//pack icons
	css += 'a:before{display:inline-block!important;width:16px!important;height:16px!important;vertical-align:top!important;margin-right:2px!important;background-image:url(data:image/png;base64,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)!important}a[href*=.google.][href*=/accounts/Login]:before,a[href*=.google.][href*=/accounts/ClearSID]:before,a[href*=.google.][href*=/groups/signout]:before,a[href*=.google.][href*=/Logout]:before,a[href*=.google.][href*=/logout]:before,a[href*=.google.][href*=?logout]:before{background-position:-16px 0!important;content:""!important}a[href*=.google.][href*=/history/]:before{background-position:-32px 0!important;content:""!important}a[href^=/maps/user?],a[href*=.google.][href*=/accounts/ManageAccount]:before{background-position:0 0!important;content:""!important}a[href*=.google.][href*=/support]:before{background-position:-64px 0!important;content:""!important}a[href*=/advanced_search?]:before{background-position:-48px 0!important;content:""!important}a[href*=.google.][href*=#settings]:before,a[href*=/preferences?]:before{background-position:-80px 0!important;content:""!important}a[href*=/shoppinglist?]:before{background-position:-96px 0!important;content:""!important}a[href*=.google.][href*=pref=ig]:before{background-position:-112px 0!important;content:""!important}';
	//hide logo / Show search box
	css+='#logo-container{ display: none !important; }#search{left:500px!important;top:30px!important;z-index:2000!important;}';
	//Show user information
	css+='#guser nobr .gb4, #guser nobr .offline-status, #offline-status-marker{top:-43px!important;}';
	
	css+='.gbm{position:fixed!important;}';
//TODO: give offline span a hover button 
//make .offline-status same behavior as #guser nobr > a (:hover active...)
	GM_addStyle(css);
};