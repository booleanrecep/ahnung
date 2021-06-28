import React from "react"
import {BlogList} from "../../components/index"
import {withNextRouter } from "storybook-addon-next-router"

export default {
    component:BlogList,
    title:"BlogList",
    decorators:[withNextRouter]
}

const Template = (args=><BlogList {...args}/>)

export const Default = Template.bind({})
Default.args={
    articles:[
        {title:"Test 1",_id:"1",deletable:false},
        {title:"Test 2" ,_id:"3",deletable:false},
        {title:"Test 3",_id:"3",deletable:false}
    ],
    nextRouter:{
    query:{
        lang:"tr",
        title:"test"
    }
    },
    showFunc:false
}
