/*
 	example of publication design and joining across reactive collections
 	https://www.discovermeteor.com/blog/reactive-joins-in-meteor/

 	when a board's members are chagned, publish new members to clients
*/
Meteor.publish("board", function(boardID) {
	var sub = this, boardColName = 'boards', userColName = 'users';
	var boardHandle = null, memberHandle = null;

	console.log('publish boards: ', boardColName, boardID);

	var publishMembers = function publishMembers(boardID, memberObjects) {
		var memberIDs = memberObjects.map(function(m) {
			return m._id;
		})
		console.log('publishMembers: ', memberIDs);
		var memberCursor = SB.User.find({_id: {$in: memberIDs}});
		memberHandle = Meteor.Collection._publishCursor(memberCursor, sub, userColName);	
	}

	boardHandle = SB.Board.find({_id: boardID}).observeChanges({
		added: function(id, board) { 
			console.log('added board: ', id, board._id);
			sub.added(boardColName, id, board); 
		},
		// if members field change subscribe to all boards members again
		changed: function(id, fields) { 
			console.log('changed board: ', id, fields);
			if (boardID == id && fields['members'])
				publishMembers(id, fields['members']);
			sub.changed(boardColName, id, fields);
		},
		removed: function(id) { sub.removed(boardColName, id); }
	})

	sub.ready();

	sub.onStop(function() {
		boardHandle.stop();
		boardHandle.stop();
	});
});

Meteor.publish("boardMembers", function(boardID) {
	var board = SB.Board.findOne(boardID);
	// console.log('boardMembers: ', board);
	if (!board) return;
	var ret = board ? board.memberQuery() : null;
	console.log(ret.count() + ' users of board \'' + board.name + '\'');
	return ret
});

/* gameQuery is reactive as there are no extra-cursor properties the
	the query is dependent on */
Meteor.publish("boardGames", function(boardID) {
	var board = SB.Board.findOne(boardID);
	// console.log('boardGames: ', board);
	if (!board) return;
	var ret = board ? board.gameQuery() : null;
	console.log(ret.count() + ' games for board \'' + board.name + '\'');	
	return ret;
});



/*

this function returns success prior to subscription of children has completed.
This was causing headaches during testing so reverted to basic Meteor.publish.
war5

Meteor.publishComposite('sbSquaresBoardPublication', function(boardID) {
	return {
		find: function() {
			console.log('sbSquaresBoardPublication', boardID, SB.Board.find({_id: boardID}).count());
			return SB.Board.find({_id: boardID});
		}
		,
		children: [
			{	// publish Board users
				find: function(board) {
						var ret = board.memberQuery();
						console.log(ret.count() + ' users of board \'' + board.name + '\'');
					return ret
				}
			},
			{	// publish Board games
				find: function(board) {
					var ret = board.gameQuery();
						console.log(ret.count() + ' games for board \'' + board.name + '\'');	
					return ret;
				}
			}
		]
	}
});
*/