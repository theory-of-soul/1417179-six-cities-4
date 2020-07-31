import React from "react";
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LogIn from "./log-in";
import {BrowserRouter} from "react-router-dom";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`LogIn component e2e tests`, () => {
  it(`LogIn submit calls once`, () => {
    const onSubmitCallback = jest.fn();

    const logInComponent = mount(
        <BrowserRouter>
          <LogIn onSubmitHandler={onSubmitCallback}/>
        </BrowserRouter>
    );

    logInComponent.find(`.login__form`).simulate(`submit`, {
      preventDefault() {}
    });

    expect(onSubmitCallback.mock.calls.length).toBe(1);
  });

  it(`LogIn submit params email and password`, () => {
    const onSubmitCallback = jest.fn();

    let logInComponent = mount(
        <BrowserRouter>
          <LogIn onSubmitHandler={onSubmitCallback}/>
        </BrowserRouter>
    );

    logInComponent.find(`.login__input`).at(0).instance().value = `test@test.com`;
    logInComponent.find(`.login__input`).at(1).instance().value = `123456789`;

    logInComponent.find(`.login__form`).simulate(`submit`, {
      preventDefault() {}
    });

    expect(onSubmitCallback.mock.calls[0][0]).toBe(`test@test.com`);
    expect(onSubmitCallback.mock.calls[0][1]).toBe(`123456789`);
  });
});
