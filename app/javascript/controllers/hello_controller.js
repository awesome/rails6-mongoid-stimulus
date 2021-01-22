// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "output" ]

  initialize() {
    console.log("Stimulus: initialize() - Once, when the controller is first instantiated. https://stimulus.hotwire.dev/reference/lifecycle-callbacks#methods")
  }

  connect() {
    this.outputTarget.textContent = 'Hello, Stimulus!'
  }
}
