MyData = new Mongo.Collection('myData');

if (Meteor.isClient) {

}

if (Meteor.isServer) {
  if (MyData.find().count() === 0) {
    MyData.insert({
      info: "This is Data"
    })
  }
}
