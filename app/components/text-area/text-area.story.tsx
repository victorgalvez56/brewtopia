import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import TextArea from "./text-area"

storiesOf("TextArea", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The p: crimary.">
        <TextArea placeholder="text" />
      </UseCase>
    </Story>
  ))
