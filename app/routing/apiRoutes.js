console.log("API Route Connected Successfully");

var friendsData = require("../data/friends.js");
function apiRoutes(app) {
	app.get("/api/friends", function(req, res) {
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res) {
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: []
		};
		var scoresArray = [];
		for (var i = 0; i < req.body.scores.length; i++) {
			scoresArray.push(parseInt(req.body.scores[i]))
		}
		newFriend.scores = scoresArray;

		var comparisonArray = [];
		for(var i = 0; i < friendsData.length; i++) {
			var currentComparison = 0;
			for(var k = 0; k < newFriend.scores.length; k++) {
				currentComparison += Math.abs(newFriend.scores[k] - friendsData[i].scores[k]);
			}
			comparisonArray.push(currentComparison);
		}
		var matchPosition = 0;
		for(var i = 1; i < comparisonArray.length; i++) {
			if(comparisonArray[i] <= comparisonArray[matchPosition]) {
				matchPosition = i;
			}
		}
		var friendMatch = friendsData[matchPosition];
		res.json(friendMatch);
		friendsData.push(newFriend);
	});
}

module.exports = apiRoutes;