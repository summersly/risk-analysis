Component({
  properties: {
    icon: String,
    name: String,
    route: String
  },
  onLoad: function () {
    console.log(this)
  },
  methods: {
    toDesRoute: function () {
      wx.navigateTo({
        url: this.properties.route
      })
    }
  }
})