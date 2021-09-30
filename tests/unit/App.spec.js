/* import { expect } from "chai";
import App from "@/App";
import Vue from "vue";

describe("App.vue", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(App);
    const vm = new Constructor().$mount();

    expect(
      vm.$el.querySelector(".ui.selectable thead tr th").textContent
    ).to.contain("Items");
    expect(vm.$el.querySelector(".ui.button").textContent).to.contain("Add");
    expect(vm.$el.querySelector(".ui.label").textContent).to.contain(
      "Remove all"
    );
  });
});

describe("App.vue", () => {
  it("should render correct contents", () => {});
  it("should set correct default data", () => {
    const initialData = App.data();

    expect(initialData.item).to.equal("");
    expect(initialData.items).to.deep.equal([]);
  });
});
 */

import App from "@/App";
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";

describe("App.vue", () => {
  let wrapper; //Wrapper is an object that containes a mounted component and methods
  beforeEach(() => {
    wrapper = shallowMount(App); //allows to render a component without rendering its childs

    it("should render correct contents", () => {
      expect(wrapper.html()).to.contain("<th>Items</th>");
      expect(wrapper.html()).to.contain(
        '<input type="text" placeholder="Add item..." value="" class="prompt">'
      );
      expect(wrapper.html()).to.contain(
        '<button type="submit" disabled="disabled" class="ui button">Add</button>'
      );
      expect(wrapper.html()).to.contain(
        '<span class="ui label">RemoveAll</span>'
      );
    });

    it("should set correct default data", () => {
      expect(wrapper.vm.item).to.equal(""); // wrapper.vm -> allows us to access the data properties directly from the actual Vue instance
      expect(wrapper.vm.items).to.deep.equal([]);
    });

    it('should have the "Add" button disabled', () => {
      const addItemButton = wrapper.find(".ui.button");
      expect(addItemButton.element.disabled).to.be.true;
    });

    describe("the user populates the text input field", () => {
      let inputField;

      beforeEach(() => {
        inputField = wrapper.find("input");
        inputField.element.value = "New Item";
        inputField.trigger("input");
      });

      it("should update the text data property", () => {
        expect(wrapper.vm.item).to.equal("New Item");
      });

      it("should enable the 'Add' button when text input is populated", () => {
        const addItemButton = wrapper.find(".ui.button");
        expect(addItemButton.element.disabled).to.be.false;
      });

      describe("after the user clears the input", () => {
        it("should disble the 'Add' button", () => {
          const addItemButton = wrapper.find(".ui.button");

          inputField.element.value = "";
          inputField.trigger("input");

          expect(addItemButton.element.disabled).to.be.true;
        });
      });

      describe("and then submits the form", () => {
        let addItemButton;
        let itemList;
        let inputField;

        beforeEach(() => {
          addItemButton = wrapper.find(".ui.button");
          itemList = wrapper.find(".item-list");
          inputField = wrapper.find("input");

          wrapper.setData({ item: "New Item" });
          addItemButton.trigger("submit");
        });

        it('should add a new item to the "items" data property', () => {
          expect(itemList.element.value).to.be.be("New Item");
        });

        it("the input field is cleared out", () => {
          expect(wrapper.vm.item).to.equal("");
          expect(inputField.element.value).to.equal("");
        });

        it('should disable the "Add" button', () => {
          expect(addItemButton.element.disabled).to.be.true;
        });
      });
    });

    describe("user clicks the 'Remove all' label", () => {
      let itemList;
      let removeAll;

      beforeEach(() => {
        wrapper.setData({ items: ["Item #1", "Item #2", "Item #3"] });
        itemList = wrapper.find(".item-list");
        removeAll = wrapper.find(".ui.label");
      });

      it("should remove all item from 'items list'", () => {
        removeAll.trigger("click");

        expect(wrapper.vm.items).to.deep.equal([]);
        expect(itemList.html()).to.not.contain("<td>Item #1</td>");
        expect(itemList.html()).to.not.contain("<td>Item #2</td>");
        expect(itemList.html()).to.not.contain("<td>Item #3</td>");
      });
    });
  });
});
