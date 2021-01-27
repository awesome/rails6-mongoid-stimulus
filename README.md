# rails6-mongoid-stimulus
Example Rails 6.1 app with Mongoid & Stimulus (no rails_ujs)

## Why?
Pretty much to address removal of rails_ujs breaking [Devise's "The default HTTP method used to sign out a resource. Default is :delete"](https://github.com/heartcombo/devise/blob/81bf3ad8c1e3812448ba4588598493c8e80ecf10/lib/generators/templates/devise.rb#L268-L269).

## About this repo
* [rails_ujs](https://github.com/rails/rails/tree/6-1-stable/actionview/app/assets/javascripts/rails-ujs)/[@rails/ujs](https://www.npmjs.com/package/@rails/ujs) completely removed in anticipation of official deprecation and replacement by https://github.com/hotwired/stimulus-rails.
* Includes a `link_to 'blah', blah_path, method: :delete` (with optional `confirm: 'Are you sure?'`) via stimulus instead of rails_ujs.
* [HAML](https://github.com/haml/haml-rails) used instead of ERB for view templates.

## Features

### Stimulus

#### `link_to-controller`

**NOTICE: Functionality ported from [rails_ujs](https://github.com/rails/rails/tree/6-1-stable/actionview/app/assets/javascripts/rails-ujs) is scoped to `link_to` here in [rails6-mongoid-stimulus](https://github.com/awesome/rails6-mongoid-stimulus)**

* includes [rails_ujs delete and confirm/delete](https://github.com/rails/rails/blob/11341fdb3a1664ba58edf729ed46e04cd0e20ed6/actionview/app/assets/javascripts/rails-ujs/features/method.coffee)
* includes functionality of [rails_ujs confirm](https://github.com/rails/rails/blob/11341fdb3a1664ba58edf729ed46e04cd0e20ed6/actionview/app/assets/javascripts/rails-ujs/features/confirm.coffee)
* includes [rails_ujs Rails.isCrossDomain helper]( https://github.com/rails/rails/blob/291a3d2ef29a3842d1156ada7526f4ee60dd2b59/actionview/app/assets/javascripts/rails-ujs/utils/ajax.coffee#L83)

##### Usage

1. Install [Stimulus for Rails](https://github.com/hotwired/stimulus-rails#installation).

2. Add [`link-to_controller.js`](https://github.com/awesome/rails6-mongoid-stimulus/blob/a2b3f0ca6aa76ee33450fefe64f01cf2a7336aba/app/javascript/controllers/link-to_controller.js) to `app/javascripts/controllers/`.

3. In view template, use `link_to` per [instructions](https://guides.rubyonrails.org/getting_started.html#resourceful-routing) and [documentation]( https://api.rubyonrails.org/v6.1.1/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to).

4. To `link_to` add stimulus controller and action with [data attributes](https://api.rubyonrails.org/v6.1.1/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to-label-Data+attributes) like: `data: {controller: 'link-to', action: 'click->link-to#method'}`


Example: https://github.com/awesome/rails6-mongoid-stimulus/blob/a2b3f0ca6aa76ee33450fefe64f01cf2a7336aba/app/views/home/index.html.haml#L4-L6


###### HAML

```
# in app/views/blah/whatevs.html.haml

= link_to "delete", "/blah/1337", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method'}
# <a data-controller="link-to" data-action="click->link-to#method" rel="nofollow" data-method="delete" href="/blah/1337">delete</a>

= link_to "delete", "/blah/1337", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method', confirm: 'Are you sure?'}
# <a data-controller="link-to" data-action="click->link-to#method" data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/blah/1337">delete</a>
```

###### ERB

```
# in app/views/blah/whatevs.html.erb

<%= link_to "delete", "/blah/1337", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method'} %>
# <a data-controller="link-to" data-action="click->link-to#method" rel="nofollow" data-method="delete" href="/blah/1337">delete</a>

<%= link_to "delete", "/blah/1337", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method', confirm: 'Are you sure?'} %>
# <a data-controller="link-to" data-action="click->link-to#method" data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/blah/1337">delete</a>
```

#### Links about stimulus vs rails_ujs
* https://discuss.hotwire.dev/t/button-to-not-showing-the-data-confirm/2046
* https://github.com/hotwired/stimulus-rails/pull/29

### Mongoid

* Gemfile: `gem 'mongoid', github: 'mongodb/mongoid', branch: '7.2-stable'` https://github.com/awesome/rails6-mongoid-stimulus/blob/d8a4b8ea66142b0479da6aef6987a61b9d824213/Gemfile#L41
* `rails g mongoid:config` Rails-6.1 bug work-around by patching gem locally, see: "MONGOID-5042 rails g mongoid:config is not working on Rails 6.1" https://github.com/mongodb/mongoid/pull/4953



## MIT License
