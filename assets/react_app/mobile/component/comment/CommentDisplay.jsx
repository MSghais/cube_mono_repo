import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux';
import { getCommmentsResource, resourcesTypes } from "../../services/myResourcesService";
import { Button, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import { commentTypes } from '../../services/commentService';

const CommentsDisplay = ({ resourceId, catchRefresh, dispatch }) => {
    const [comments, setComments] = useState([])

    const auth = useSelector(state => state.auth)
    const comment = useSelector(state => state.comment)

    const [loaderFetch, setLoader] = useState(true)
    useEffect(() => {
        const init = async () => {
            dispatch({ type: commentTypes.loading })
            let res = await getCommmentsResource(resourceId);
            console.log("res", res);
            // const newComment = res.data["hydra:member"];
            const newComment = res["hydra:member"];
            setComments(newComment);
            setLoader(false)
            dispatch({ type: commentTypes.unload })

        }
        init()

    }, [catchRefresh])


    console.log('comments', comments)
    const viewComment = (comment) => {
        return (
            <View key={comment.id} >
                <View>
                    <Text color="textSecondary" gutterBottom>
                        Commenté le {format(Date.parse(comment.createdAt), "d MMM yyyy")} par {comment.userEntity.firstname}
                    </Text>
                    <Text variant="body2" component="p">
                        {comment.content}
                    </Text>
                </View>

            </View>
        )
    }
    function isParentResponseComment(comment, parentId) {
        if (comment.parentComment === null) {
            return viewComment(comment)
        } else if (comment.parentComment) {
            if (comment.parentComment.id === parentId) {
                return viewComment(comment)
            }
        }
    }

    const [openComment, setComment] = React.useState(false)


    if (comment.loading) {
        return <ActivityIndicator />
    }
    return (
        <ScrollView>

            <View style={styles.root}>

                {
                    comments.map(comment => (
                        <View
                            key={comment.id}
                            style={styles.main}
                        >
                            <View>
                                <Text className={styles.title} color="textSecondary" gutterBottom>
                                    Commenté le {`${new Date(comment.createdAt).getMonth()}/${new Date(comment.createdAt).getDate()}/${new Date(comment.createdAt).getFullYear()}`} par {comment.userEntity.firstname}
                                </Text>

                                <Text className={styles.title} color="textSecondary" gutterBottom>
                                    Commenté le {`${new Date(comment.createdAt).getMonth()}/${new Date(comment.createdAt).getDate()}/${new Date(comment.createdAt).getFullYear()}`} par {comment.userEntity.firstname}
                                </Text>
                                <View
                                >
                                    {comment.userEntity.firstname} says :
                                    <Text
                                        variant="body2"
                                        component="p"
                                    >
                                        {comment.content}
                                    </Text>



                                </View>

                                <View>
                                {<Text className={styles.title} color="textSecondary" gutterBottom>
                                    Commenté le {`${new Date(comment.createdAt).getMonth()}/${new Date(comment.createdAt).getDate()}/${new Date(comment.createdAt).getFullYear()}`} par {comment.userEntity.firstname}
                                </Text>}
                                </View>

                            </View>
                        </View>
                    ))
                }
            </View>

        </ScrollView>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    comment: state.comment
});

export default connect(mapStateToProps)(CommentsDisplay)

const styles = StyleSheet.create({
    root: {
        minWidth: 275,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 1, margin: 40,
        borderRadius: 10, flexDirection: 'column', borderColor: 'dark',
        alignItems: 'center', textAlign: 'center',
        color: '#FFF', backgroundColor: '#FFF',
        borderWidth: 0.1,
        borderColor: 'black',
        margin: 1,

        color: '#FFF',
    },
    contentDivider: {
        borderWidth: 0.1,
        borderColor: 'black',
        margin: 1,

        color: '#FFF',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },


    attributeLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'left',



    },

    textValue: {
        fontSize: 13,
        padding: 5,
    },

    topLeft: {
        position: "absolute",
        top: 10,
        left: 15,
        textAlign: 'left',

    },
    favoriteButton: {
        position: "absolute",
        top: 10,
        right: 15,
        textAlign: 'right'
    },

    categoryLabel: {
        top: 10,
        left: 0,
        textAlign: 'left',

    },

    titleArticle: {
        fontSize: 'larger',
        marginTop: 13,

    },

    contentDivider: {
        borderWidth: 0.1,
        borderColor: 'black',
        margin: 1,

        color: '#FFF',
    },
    txt: {
        fontSize: 30, marginTop: 20,
        color: '#FFF'
    },
    txt_md: {
        fontSize: 20, marginTop: 5,
        color: '#FFF'
    },
    img: { width: 150, height: 150, marginTop: 20 },
    pan: { borderWidth: 1, borderRadius: 30, borderColor: 'gray', padding: 10, marginTop: 5, marginBottom: 5, flex: 0 },
    btn: {
        width: "120%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFA831",
    },
})

