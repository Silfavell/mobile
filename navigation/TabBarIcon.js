import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={28}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#5D3EBD' : '#CCC'}
    />
  )
}