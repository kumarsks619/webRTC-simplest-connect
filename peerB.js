// after receiving the offer from remote (the peer A)
const offer = { type: 'offer', sdp: '' }

const rc = new RTCPeerConnection()

rc.onicecandidate = (e) =>
    console.log(
        '[New ICE Candidate! Reprinting SDP] ' + JSON.stringify(rc.localDescription)
    )

rc.ondatachannel = (e) => {
    rc.dc = e.channel
    rc.dc.onmessage = (e) => console.log('[New Message Received] ' + e.data)
    rc.dc.onopen = (e) => console.log('[New Connection Opened]')
}

rc.setRemoteDescription(offer).then(() => console.log("[Remote's Offer Set]"))

rc.createAnswer()
    .then((a) => rc.setLocalDescription(a))
    .then(() => console.log('[Answer Created and Set Locally]'))

rc.dc.send("Hello! I'm Peer B")
