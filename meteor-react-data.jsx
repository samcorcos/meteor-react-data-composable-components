MyData = new Mongo.Collection('myData');

if (Meteor.isClient) {

  Meteor.startup(function() {
    React.render(
      <Component />,
      document.getElementById('app')
    );
  })

  Component = React.createClass({
    render() {
      return (
        <div>
          This is where the data goes
        </div>
      )
    }
  })
}

if (Meteor.isServer) {
  if (MyData.find().count() === 0) {
    MyData.insert({
      info: "This is Data"
    })
  }
}
