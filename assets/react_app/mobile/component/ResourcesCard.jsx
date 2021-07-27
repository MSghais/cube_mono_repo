import React from 'react'
import {connect} from 'react-redux'
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground } from 'react-native'

const ResourcesCard = ({ navigation, resource, token }) => {
    // const ResourcesCard = ({ resource }) => {


    // const onPress = () => {
    //     //permet ajouter une vue dans la stack navigation et de l'afficher
    //     // utiliser navigation.push pour des view sans paramètre 
    //     // ou navigation.navigate si vous avez besoin d'envoyer des paramètres a la vue
    //     navigation.navigate('Resource', { resource: resource })
    // }
    // console.log('resource', resource)
    // const navigation = useNavigation()
    const onPress = () => {
        //permet ajouter une vue dans la stack navigation et de l'afficher
        // utiliser navigation.push pour des view sans paramètre 
        // ou navigation.navigate si vous avez besoin d'envoyer des paramètres a la vue
        //   navigation.navigate('Home')
        //   navigation.pop();
        navigation.navigate('Resource', { resource: resource })

    }



    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ flex: 1, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 10, backgroundColor: 'white' }}>

                <View style={styles.topLeft}>

                    {resource.type &&
                        <View >
                            {resource.type.label &&
                                <Text style={styles.firsttext}>{resource.type.label}</Text>
                            }
                        </View>
                    }

                    {resource.category &&
                        <View style={styles.categoryLabel}>
                            {resource.category.label &&
                                <Text style={styles.categoryText} >{resource.category.label}</Text>
                            }
                        </View>
                    }
                </View>

                <View style={styles.topRight}>
                    {resource.author &&
                        <>
                            <View>
                                <Text style={styles.authorName}>{resource.author.firstname} </Text>
                            </View>
                        </>
                    }
                </View>

                <View>
                    <Image source={{ uri: resource.imageUrl }} style={{ width: 250, height: 100 }} />
                </View>

                <View style={styles.titleArticle}>
                    <Text style={styles.titreArticle}>{resource.title} </Text>
                </View>




            </View>
            <View style={styles.lineStyle} />



        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({

    topLeft: {
        position: "absolute",
        top: 10,
        // right:15,
        left: 15,
        textAlign: 'left'

    },
    topRight: {
        position: "absolute",
        top: 10,
        right: 15,
    },

    categoryLabel: {
        top: 10,
        left: 0,
    },
    categoryText: {

        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    authorName: {
        color: '#FFA831',
        fontSize: 16,
        fontWeight: 'bold',
    },

    titreArticle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
    },

    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    to: {
        backgroundColor: '#FFF',
        marginBottom: 5,
    },
    firsttext: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        textShadowColor: '#FFA831',
    }

});


// export default ResourcesCard


function mapStateToProps(state) {
    const { resources, auth } = state
    return {resources, auth}
    // return { todoList: todos.allIds }
}

export default connect(mapStateToProps)(ResourcesCard)