const Redirect = {
  name: 'Redirect',
  inject: ['router'],
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  created () {
    this.router.history.replace(this.to)
  },
  render () {
    return null
  },
}

export default Redirect
