function injectProps (component, props) {
  const options = component.componentOptions = component.componentOptions || {}
  const propsData = options.propsData = options.propsData || {}

  Object.assign(propsData, props)
};

export { injectProps }
