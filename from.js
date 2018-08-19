function connectMongo(err, user, cb, obj) {
	let url = "mongodb://"function(err, client){
		if(err) throw err;const db = client.db(user.db.name);
		let collection = db.collection(user.db.collection);
		return cb(null, collection, client, obj);});
}