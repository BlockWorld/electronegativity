var y = 0;
var hasHydrogen = false;
var electronegativity = { "H":2.20, "He":0, "Li":0.98, "Be":1.57, "B":2.04, "C":2.55, "N":3.04, "O":3.44, "F":3.98, "Ne":0, "Na":0.93, "Mg":1.31, "Al":1.61, "Si":1.90, "P":2.19, "S":2.58, "Cl":3.16, "Ar":0, "K":0.82, "Ca":1.0, "Sc":1.36, "Ti":1.54, "V":1.63, "Cr":1.66, "Mn":1.55, "Fe":1.83, "Co":1.88, "Ni":1.91, "Cu":1.90, "Zn":1.65, "Ga":1.81, "Ge":2.01, "As":2.18, "Se":2.55, "Br":2.96, "Kr":3.0, "Rb":0.82, "Sr":0.95, "Y":1.22, "Zr":1.33, "Nb":1.6, "Mo":2.16, "Tc":1.9, "Ru":2.2, "Rh":2.28, "Pd":2.20, "Ag":1.93, "Cd":1.69, "In":1.78, "Sn":1.96, "Sb":2.05, "Te":2.1, "I":2.66, "Xe":2.6, "Cs":0.79, "Ba":0.89, "La":1.10, "Ce":1.12, "Pr":1.13, "Nd":1.14, "Pm":0, "Sm":1.17, "Eu":0, "Gd":1.20, "Tb":0, "Dy":1.22, "Ho":1.23, "Er":1.24, "Tm":1.25, "Yb":0, "Lu":1.27, "Hf":1.3, "Ta":1.5, "W":2.36, "Re":1.9, "Os":2.2, "Ir":2.20, "Pt":2.28, "Au":2.54, "Hg":2.0, "Tl":1.62, "Pb":2.33, "Bi":2.02, "Po":2.0, "At":2.2, "Rn":0, "Fr":0.7, "Ra":0.9, "Ac":1.1, "Th":1.3, "Pa":1.5, "U":1.38, "Np":1.36, "Pu":1.28, "Am":1.3, "Cm":1.3, "Bk":1.3, "Cf":1.3, "Es":1.3, "Fm":1.3, "Md":1.3, "No":1.3, "Lr":0, "Rf":0, "Db":0, "Sg":0, "Bh":0, "Hs":0, "Mt":0, "Ds":0, "Rg":0, "Cn":0, "Nh":0, "Fl":0, "Mc":0, "Lv":0, "Ts":0, "Og":0 };
function hasNumber(str) {
	return /\d/.test(str);
}
function bondType(num) {
	if (num <= .5) {
		return "nonpolar covalent, London forces";
	} else if (num < 1.7) {
		return "polar covalent, ";
	} else if (num >= 1.7) {
		return "ionic";
	} else {
		return "what";
	}
}
function evaluate(str) {
	var elements = str.split("-");
	for (i = 0; i < elements.length; i++) {
		if (hasNumber(elements[i])) {
			for (j = 2; j <= elements[i].match(/\d+/)[0]; j++) {
				elements.push(elements[i].replace(/[0-9]/g, ''));
			}
		}
	}
	for (i = 0; i < elements.length; i++) {
		elements[i] = elements[i].replace(/[0-9]/g, '');
	}
	if (elements.length == 0) {
		return "";
	} else if (elements.length == 1) {
		return electronegativity[elements[0]].toString();
	} else if (elements.length == 2) {
		var returnStr = (Math.round((Math.abs(electronegativity[elements[0]] - electronegativity[elements[1]]))* 100) / 100).toString() + ", " + bondType(Math.abs(electronegativity[elements[0]] - electronegativity[elements[1]])).toString();
		for (i = 0; i < 2; i++) {
			if (elements[i] == "H") {
				hasHydrogen = true;
			}
		}
		if (((bondType(Math.abs(electronegativity[elements[0]] - electronegativity[elements[1]])).toString()) == "polar covalent, ") && hasHydrogen) {
			returnStr += "hydrogen bonding";
		} else if (((bondType(Math.abs(electronegativity[elements[0]] - electronegativity[elements[1]])).toString()) == "polar covalent, ")) {
			returnStr += "dipole-dipole";
		} else {
			// xd
		}
		hasHydrogen = false;
		for (i = 0; i < elements.length; i++) {
			if (electronegativity[elements[i]] == 0) {
				returnStr = elements[i].toString() + " does not have an electronegativity value.";
			}
		}
		return returnStr;
	} else {
		return "sorry HONC 1234 is too hard lol";
	}
}
function submitFormula() {
	var formula = document.getElementById("formula");
	var difference = document.createElement("p");
	var node = document.createTextNode(evaluate(formula.value));
	difference.appendChild(node);
	difference.id = "p1";
	var element = document.getElementById("pcontainer");
	if (y > 0) {
		element.removeChild(document.getElementById("p1"));
	}
	element.appendChild(difference);
	y += 1;
}
