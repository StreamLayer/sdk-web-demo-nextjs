'use client'

import { StreamLayerProvider, StreamLayerSDKReact, DeepLinkCallback, VideoPlayerCallback } from '@streamlayer/react'
import { StreamLayerSDKPoints } from '@streamlayer/react/points'
import { StreamLayerLogin } from '@streamlayer/react/auth'
import { StreamLayerSDKAdvertisement } from '@streamlayer/react/advertisement'
import '@streamlayer/react/style.css'
import { useState } from 'react'
import styles from "./page.module.css";

const SDK_KEY = process.env.NEXT_PUBLIC_SDK_KEY || ''
const PRODUCTION = process.env.NEXT_PUBLIC_PRODUCTION === 'true'
const EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID || ''

const cb: DeepLinkCallback = (params) => {
console.log('DeepLinkUrlParams', params)
// enable FG+
}

type VideoPlayerData = {
muted: boolean
}

const toggleVideoVolume: VideoPlayerCallback = ({ muted }: VideoPlayerData) => {
console.log('ToggleVideoVolume', muted)
const player = document.getElementsByTagName('video')[0] as HTMLVideoElement

if (muted) {
    player.volume = 0
} else {
    player.volume = 1
}
}

export const SDK = () => {
    const [user, setUser] = useState({ token: '', schema: '' })
    const [event, setEventId] = useState(EVENT_ID)

    const submitUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const token = data.get('token') as string
        const schema = data.get('schema') as string

        setUser({ token, schema })
    }

    const activateEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        const event = data.get('event') as string

        setEventId(event)
    }

    return (
        <>
            <div className={styles.description}>
                <form onSubmit={submitUser}>
                    <div>
                        <label htmlFor="token">token</label>
                        <input type="text" id="token" name="token" />
                    </div>
                    <div>
                        <label htmlFor="schema">schema</label>
                        <input type="text" id="schema" name="schema" />
                    </div>
                    <div>
                        <button type="submit">submit</button>
                    </div>
                </form>


                <form onSubmit={activateEvent}>
                    <div>
                        <label htmlFor="event">event</label>
                        <input type="text" id="event" name="event" defaultValue={EVENT_ID} />
                    </div>
                    <div>
                        <button type="submit">activate</button>
                    </div>
                </form>
            </div>
            <StreamLayerProvider sdkKey={SDK_KEY} production={PRODUCTION} onDeepLinkHandled={cb} videoPlayerController={toggleVideoVolume}>
                <div className={styles.sdk}>
                    <div className={styles.points}>
                        <StreamLayerSDKPoints />
                    </div>
                    <StreamLayerLogin token={user.token} schema={user.schema} />
                    <StreamLayerSDKReact event={event} />
                </div>
                <div className={styles.advertisement}>
                    <h3>Advertisement</h3>
                    <div>
                        <p>sidebar</p>
                        <StreamLayerSDKAdvertisement event={event} sidebar="left" layoutMode="side-by-side" />
                    </div>
                    <div>
                        <p>banner</p>
                        <StreamLayerSDKAdvertisement event={event} banner="bottom" layoutMode="side-by-side" />
                    </div>
                    <div>
                        <p>overlay</p>
                        <StreamLayerSDKAdvertisement event={event} />
                    </div>
                </div>
            </StreamLayerProvider>
        </>
    )
}

export default SDK