# What is this?
 This is a router based on components. It is a way of declaratively using routes, and has an api inspired by React Router 4.

# Why? What's wrong with vue-router?
Nothing really. VueRouter is a fine project, which has tons of official support, and probably supports many more use-cases and edge cases than this. However, it does force you to define your entire route structure upfront. It also creates a slight disconnect between your routes and your UI, as if they were two separate things. Using components as a router feels very natural in a component based, declarative system, which Vue is.

This was also a good excuse to try out the new provide/inject feature of Vue 2.2+

## Installation
`npm install/yarn add vue-component-router`

### Basic Usage

```
<template>
<HistoryRouter>
    <div>
    <Route path="/contacts">
        <Contacts :contacts="contacts"></Contacts>
    </Route>
    <Route path="/contacts/:id">
        <Contact></Contact>
    </Route>
    </div>
</HistoryRouter>
</template>
<script>
import {HistoryRouter, Route, RouterLink} from 'vue-component-router';

export default {
   data () {
      return {
         contacts: ['Contact 1', 'Contact 2']
      };
   },
   components: {
      HistoryRouter,
      Route,
      Contacts: {
         props: ['contacts'],
         components: {RouterLink},
         template: `
           <ul>
                <li v-for="contact of contacts">
                   <RouterLink :to="`/contacts/${contact}`"></RouterLink>
                </li>
           </ul> `
      },
      Contact: {
         props: ['id'],
         template: `
         <div>{{id}}</div>
         `
      }
   }
}
</script>
```

### Components
## `Router`
Router acts as a provider to the various other components, or any other component which is decorated with `withRouter`, passing down the current location, and history object. It expects a location object, which has an API similar to `window.location` and a history object, with an API similar to `window.history` to be passed in as props.

## `HistoryRouter`
A component which passes the browser's history and location (via the `history` module on npm) to Router. This is what you will want to use (in a browser).

## `Route`

Take's two props, `path` and `exact`. Path takes an express style route (which is based on [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)), and if the browser's location matches that path, it will show the content. The content can either be a a component, or a scopedSlot. They will be passed the router parameters, the path that matched (useful for nesting routes), and the current url (useful for building nested links), either as props, or as parameters, respectively.

Passing in `exact` as true will make the route match exactly.
```
<Route path="something/:id">
   <template scope="{id, path, url}">
      {{id}} {{path}} {{url}}
   </template>
</Route>
```

## `RouterLink`

Takes two props, `to` and and optional `activeClass` (defaults to 'active'). This will render a link tag which knows how to update the location, and will set an active class when the route matches the link.

## `MatchFirst`

Expects a list of `Routes` as slots, and will render the first one that matches.

## `Redirect`

Takes a prop `to`, and will cause the browser to redirect to that url

## `withRouter`

a HOC which will inject the wrapped function and inject the `router` object, which contains the `history` and `location` objects

