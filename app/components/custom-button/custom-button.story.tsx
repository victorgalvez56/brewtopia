import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import  CustomButton  from "./custom-button"

storiesOf("CustomButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CustomButton
              title="Log in"
              onPress={() => console.log("hola mundo")}
              variant="secondary"
              styleContainer="mt-4 border border-facebook-500"
              backgroundColorRiple="#c4c4c4"
            >
      </UseCase>
    </Story>
  ))
