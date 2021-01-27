//
// example of link_to method delete (optional confirm) via stimulus instead of rails_ujs
//
// # # app/views/home/index.html.haml
// #
// # = link_to "delete", "/delete", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method'}
// # %br
// # = link_to "delete", "/delete", method: :delete, data: {controller: 'link-to', action: 'click->link-to#method', confirm: 'Are you sure?'}
//
// basically a port of method.coffee to stimulusjs
// https://github.com/rails/rails/blob/main/actionview/app/assets/javascripts/rails-ujs/features/method.coffee
//

import { Controller } from "stimulus"

export default class extends Controller {

  method(event) {
    event.preventDefault()
    event.stopImmediatePropagation()

    let link = this.element
    let method = link.getAttribute('data-method')
    if (!method) {return}

    let confirmText = link.getAttribute('data-confirm')
    if (!!confirmText) {
      if (!(window.confirm(confirmText))) {return}
    }

    let href = link.href
    let el
    let csrfToken = (el = document.querySelector('[name="csrf-token"]')) ? el.getAttribute('content') : null
    el = null
    let csrfParam = (el = document.querySelector('[name="csrf-param"]')) ? el.getAttribute('content') : null
    let form = document.createElement('form')
    let formContent = "<input name='_method' value='" + method + "' type='hidden' />"
    // Rails.isCrossDomain(href)
    let isCrossDomain = false

    //if csrfParam? and csrfToken? and not Rails.isCrossDomain(href)
    if (!!csrfParam && !!csrfToken && !isCrossDomain) {
      formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />"
    }

    // Must trigger submit by click on a button, else "submit" event handler won't work!
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit
    formContent += '<input type="submit" />'

    form.method = 'post'
    form.action = href
    form.target = link.target
    form.innerHTML = formContent
    form.style.display = 'none'

    document.body.appendChild(form)
    form.querySelector('[type="submit"]').click()
  }

}
