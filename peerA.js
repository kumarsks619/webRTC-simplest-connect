const lc = new RTCPeerConnection()

const dc = lc.createDataChannel('cool-channel')

dc.onmessage = (e) => console.log('[New Message Received] ' + e.data)

dc.onopen = (e) => console.log('[New Connection Opened]')

lc.onicecandidate = (e) =>
    console.log(
        '[New ICE Candidate! Reprinting SDP] ' + JSON.stringify(lc.localDescription)
    )

lc.createOffer()
    .then((o) => lc.setLocalDescription(o))
    .then(() => console.log('[Offer Created and Set Locally]'))

// after receiving the answer (offer) from remote (the peer B)
const answer = { type: 'answer', sdp: '' }

lc.setRemoteDescription(answer)

dc.send("Hello! I'm Peer A")
