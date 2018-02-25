import { Element as PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
import './node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './node_modules/@polymer/paper-input/paper-input.js';
import './node_modules/@polymer/paper-checkbox/paper-checkbox.js';
import './node_modules/@polymer/paper-button/paper-button.js';

class PolycastChecklist extends PolymerElement {
  static get properties() {
    return {
      name: {
        type: String
      },
      tasks: {
        type: Array,
        value: function () { return []; }
      }
    };
  }

  static get template() {
    return html`
    <style>
      .task {
        display: flex;
        align-items: center;
      }
    
      paper-input {
        display: inline-block;
      }
    </style>
    
    <h1>[[name]]</h1>
    
    <div>Todo:</div>
    <dom-repeat items="{{tasks}}" as="task" filter="isNotCompleted" observe="completed">
      <template>
        <div class="task">
          <paper-checkbox checked="{{task.completed}}"></paper-checkbox>
          <paper-input label="task name" no-label-float="" value="{{task.name}}"></paper-input>
        </div>
      </template>
    </dom-repeat>
    
    <div>completed:</div>
    <dom-repeat items="{{tasks}}" as="task" filter="isCompleted" observe="completed">
      <template>
        <div class="task">
          <paper-checkbox checked="{{task.completed}}"></paper-checkbox>
          <paper-input label="Task Name" no-label-float="" value="{{task.name}}"></paper-input>
        </div>
      </template>
    </dom-repeat>
    
    <paper-button on-click="addTask">Add Task</paper-button>
    `;
  }

  addTask() {
    const newTask = {
      name: '',
      completed: false,
      notify: true
    };

    this.push('tasks', newTask);
  }

  isNotCompleted(task) {
    return !task.completed
  }

  isCompleted(task) {
    return task.completed
  }
}

window.customElements.define('polycast-checklist', PolycastChecklist);
