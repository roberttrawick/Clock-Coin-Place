// recursive function to explore the graph of sequences of 1's, 5's, and 10's
// that when added and taken modulo 12 cover the numbers 0..11 (or 1..12) 

// values of the sequence elements (pennies, nickels, dimes)
var VALUES = [1, 5, 10];

// number of each value remaining
var remaining = [4, 4, 4];

// whether each of the numbers [0..11] have been covered
var covered = [
   false, false, false, false, false, false,
	false, false, false, false, false, false
];

var initial_path = [];
var solutions = [];


// evaluate the sequences that result from extending the path
// so far by one more coin, trying each
// of the remaining coin denominations. Discard bad sequences
// and recurse on good ones. Keep track of slots (hours) that
// have been covered. If we have a sequence 12 long and there's
// been no collision, we have a solution! Add it to solutions.

function explore(path_so_far, covered, last_slot, remaining) {
	var i;
	var next_slot;
	var new_path, new_covered, new_remaining;

	console.log(JSON.stringify(path_so_far));
	// explore the next segment for each of the 3 values
	for (i = 0; i < 3; i++) {
		if (remaining[i] > 0) {
			next_slot = (last_slot + VALUES[i]) % 12;
			if (!covered[next_slot]) {
				new_covered = covered.slice();
				new_covered[next_slot] = true;
				new_path = path_so_far.slice();
				new_path.push(VALUES[i]);
				new_remaining = remaining.slice();
				new_remaining[i] -= 1;
				explore(new_path, new_covered, next_slot, new_remaining);
			}
		} else {
			// use this occasion to see if we've gotten to the end
			// and therefore have a solution
			console.log(JSON.stringify(path_so_far));
			if (path_so_far.length === 12) {
				solutions.push(path_so_far);
				console.log('solution ' + solutions.length + ': ' + JSON.stringify(initial_path));
				break;
			}
		}
	}
}


console.time("graph");
explore(initial_path, covered, 0, remaining);
console.timeEnd("graph");
console.log( solutions.length + ' solutions:');
solutions.forEach(function(solution) {
	console.log( '  ' + solution);
})
