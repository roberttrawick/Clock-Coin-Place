// permutation function with 2 important properties
//	1) calls supplied function with each permutation value as it is produced rather
//		than manifesting all values.
// 2) performs permutation on arbitrary JavaScript objects, not just characters or strings

// Given an array of items, and a function to receive permuted values,
// compute the permutation of items, calling the function with each value of the
// permutation. The function looks like
// function permItem( permVal ), where permVal is the permuted value.

// Eg.  perm( { 'a', 'b', 'c' }, f ) would result in the calls
//			f( 'abc' )
//			f( 'acb' )
//			f( 'bac' )
//			f( 'bca' )
//			f( 'cab' )
//			f(	'cba' );

"use strict";
module.exports = perm;

function permHelper( prefix, suffix, permFunc ) {

	var i, j;				// indexes of items
	var subSuffix = [];	// new suffix made from subset of suffix
	var newPrefix = [];	// new prefix created by shifting suffix items onto prefix

	// The end of recursion - call the function
	// the permutation of a single suffix item is the item
	if (suffix.length == 0) {
		permFunc( prefix );
	
	} else {
		// create our own permFunc that re
	
		for (i = 0; i < suffix.length; ++i) {
			subSuffix = [];
			for (j = 0; j < suffix.length; ++j) {
				if (j !== i) {
					subSuffix.push( suffix[j] );
				}
			}
			newPrefix = prefix.slice();
			newPrefix.push( suffix[i] );
			permHelper( newPrefix, subSuffix, permFunc );
		}
	}
}

function perm( items, permFunc ) {

	// our helper will recurse
	permHelper( [], items, permFunc );

}
