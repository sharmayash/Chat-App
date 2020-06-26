// import { connect } from "react-redux"
// import React, { useEffect, useCallback, useState, useRef } from "react"

// import {
//   Slide,
//   Button,
//   Dialog,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
// } from "@material-ui/core"
// import CloseIcon from "@material-ui/icons/Close"
// import { makeStyles } from "@material-ui/core/styles"

// const useStyles = makeStyles((theme) => ({
//   appBar: {
//     position: "relative",
//     backgroundColor: "transparent",
//   },
//   title: {
//     marginLeft: theme.spacing(2),
//     flex: 1,
//   },
// }))

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />
// })

// const { RTCPeerConnection, RTCSessionDescription } = window

// const peerConn = new RTCPeerConnection()

// export const VideoDialog = ({
//   socket,
//   isOpen,
//   username,
//   roomName,
//   handleClose,
// }) => {
//   const classes = useStyles()
//   const localSrcRef = useRef()
//   const remoteSrcRef = useRef()
//   const [getCalled, setCalled] = useState(false)

//   const callUser = useCallback(
//     async (socketId) => {
//       const offer = await peerConn.createOffer()
//       await peerConn.setLocalDescription(new RTCSessionDescription(offer))

//       socket.emit("call-user", {
//         offer,
//         to: socketId,
//         username,
//       })
//     },
//     [socket, username]
//   )

//   useEffect(() => {
//     if (isOpen) {
//       peerConn.ontrack = ({ streams: [stream] }) => {
//         remoteSrcRef.current.srcObject = stream
//       }

//       navigator.getUserMedia(
//         { video: true, audio: true },
//         (stream) => {
//           localSrcRef.current.srcObject = stream

//           stream
//             .getTracks()
//             .forEach((track) => peerConn.addTrack(track, stream))
//         },
//         (error) => {
//           console.warn(error.message)
//         }
//       )
//     }
//   }, [isOpen])

//   // For Calling a user

//   useEffect(() => {
//     if (isOpen && socket) {
//       callUser(socket.id)
//     }
//   }, [isOpen, callUser, socket])

//   // For Accepting and Rejecting a Call

//   useEffect(() => {
//     if (socket) {
//       socket.on("call-made", async (data) => {
//         if (getCalled) {
//           const confirmed = window.confirm(
//             `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
//           )

//           if (!confirmed) {
//             socket.emit("reject-call", {
//               from: data.socket,
//             })

//             return
//           }
//         }

//         await peerConn.setRemoteDescription(
//           new RTCSessionDescription(data.offer)
//         )

//         const answer = await peerConn.createAnswer()
//         await peerConn.setLocalDescription(new RTCSessionDescription(answer))

//         socket.emit("make-answer", {
//           answer,
//           to: data.socket,
//         })
//         setCalled(true)
//       })
//     }
//   }, [socket, getCalled])

//   // After Accepting call & Answering it

//   useEffect(() => {
//     if (socket) {
//       socket.on("answer-made", async (data) => {
//         await peerConn.setRemoteDescription(
//           new RTCSessionDescription(data.answer)
//         )

//         // callUser(roomName)
//         // if (!isAlreadyCalling) {
//         callUser(data.socket)
//         //   isAlreadyCalling = true
//         // }
//       })
//     }
//   }, [socket, callUser, roomName])

//   // When Receiver rejects a call

//   useEffect(() => {
//     if (socket) {
//       socket.on("update-user-list", (data) => {
//         console.log(data)
//       })

//       socket.on("call-rejected", (data) => {
//         alert(`${data.socket} rejected your call.`)
//       })
//     }
//   }, [socket])

//   const closeDialog = () => {
//     handleClose(false)
//   }

//   return (
//     <Dialog
//       fullScreen
//       open={isOpen}
//       PaperProps={{
//         style: {
//           backgroundColor: "black",
//           color: "white",
//           boxShadow: "none",
//         },
//       }}
//       onClose={closeDialog}
//       TransitionComponent={Transition}
//     >
//       <AppBar elevation={0} className={classes.appBar}>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             onClick={closeDialog}
//             aria-label="close"
//           >
//             <CloseIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Video Chat
//           </Typography>
//           <Button autoFocus color="inherit" onClick={closeDialog}>
//             save
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <video autoPlay muted height="100" ref={localSrcRef}></video>
//       <video autoPlay height="100" ref={remoteSrcRef}></video>
//     </Dialog>
//   )
// }

// VideoDialog.propTypes = {}

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(VideoDialog)
