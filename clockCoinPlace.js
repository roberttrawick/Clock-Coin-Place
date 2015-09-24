// clockCoinPlace
// NodeJS JavaScript program to solve the Clock Coin Place problem.
// using brute force by computing every permutation of coin sequences
// and finding which ones are solutions.
// to set up:
//    install NodeJS
// to run:
//    node ClockCoinPlace.js

perm = require('./perm.js');

var PENNY =  {name : 'penny', val: 1, code: 'p'};
var NICKEL = {name : 'nickel', val: 5, code: 'n'};
var DIME =   {name: 'dime', val: 10, code: 'd'};

var solutions = {};

function coinSeqString(seq) {
	result = ''
	seq.forEach(function(coin, i) {
		if (i > 0) {
			result += ', ';
		}
		result += coin.name;
	});
	return result;
}

function coinSeqCode(seq) {
	result = ''
	seq.forEach(function(coin, i) {
		result += coin.code;
	});
	return result;
}


function clockCoinPlace() {
	//
	var coins = [
		PENNY, PENNY, PENNY, PENNY,
		NICKEL, NICKEL, NICKEL, NICKEL,
		DIME, DIME, DIME, DIME
	];
	var solution_code;
	var all_seq_count = 0, solution_count = 0, unique_solution_count = 0;
	perm(coins, function(solution) {
		all_seq_count += 1;
		// process.stdout.write("\033[0G" + all_seq_count);
		if (evalCoinSeq(solution)) {
			solution_count += 1;
			solution_code = coinSeqCode(solution);
			// use our hash to see if we already have this solution
			if (solutions[solution_code]) {
				// already have this one, continue
			} else {
				unique_solution_count += 1;
				console.log('solution: ' + coinSeqString(solution));
				solutions[solution_code] = 1;
			}
		}
	});
	console.log("sequences: " + all_seq_count + ", solutions: "
				+ solution_count + ", unique solutions: " + unique_solution_count);
}

//
function evalCoinSeq(seq) {
   var slots = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
   ];
   
   var last_slot;
   var next_slot;
   var coin, i;
   for (i = 0; i < seq.length; i++) {
		coin = seq[i];
		if (i === 0) {
			slots[coin.val] = 1;
			last_slot = coin.val;
			continue;
		}
		next_slot = (last_slot + coin.val) % 12;
		if (slots[next_slot] === 0) {
			slots[next_slot] = 1;
			last_slot = next_slot;
		} else {
			// already a coin here, this seq fails
			return false;
		}
   }
   return true;
}

clockCoinPlace();