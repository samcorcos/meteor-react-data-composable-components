MyData = new Mongo.Collection('myData');

if (Meteor.isClient) {

  Meteor.startup(function() {
    // Meteor.subscribe("alldata")
    // console.log(MyData.find().fetch());
    React.render(
      <MeteorData
        subscribe = { () => {Meteor.subscribe('alldata')}}
        fetch = { () => {info: MyData.find().fetch()}}
        render = { ({loading, info}) => <Component loading={loading} info={info} />}
      />,
      document.getElementById('app')
    );
  })

  MeteorData = React.createClass({
    componentWillMount() {
      this.c = Tracker.autorun(() => {
        const sub = this.props.subscribe()
        const state = this.props.fetch()
        state.loading = !sub.ready()
        this.setState(state)
      })
    },
    componentWillUnmount() {
      this.c.stop()
    },
    render() {
      return this.state ? this.props.render(this.state) : false
    }
  })

  Component = React.createClass({
    render() {
        console.log(this);
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
  Meteor.publish("alldata", function() {
    return MyData.find()
  })
}
