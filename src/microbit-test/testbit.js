import {uBitConnectDevice} from "../utils/microbit-api"

export function testMicro() {
    uBitConnectDevice((type, device, data) => {
        console.log(`Callback from ${device} with type: ${type}`)
        console.log(data)
    })
}