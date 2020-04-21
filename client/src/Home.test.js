import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./components/Home";
import Music from "./components/Music";

Enzyme.configure({ adapter: new Adapter() });

describe("Home", () => {
  it("should show text", () => {
    const wrapper = shallow(<Home />);
    const text = wrapper.find("div h1");
    expect(text.text()).toBe("Welcome to iTunes Search");
  });

  it("should nav to movies when clicked", () => {
    const wrapper = shallow(<Music />);
    const text = wrapper.find("div h2");
    expect(text.text()).toBe("Search For Music Below");
  });
});

