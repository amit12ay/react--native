import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react';
import { firebase} from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, SetAddData] = useState ('');
    const navigation = useNavigation();

    /*-----------fetch or read the data from firestore----------------*/
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        onSnapshort(
            querSnapshot => {
                const todos = []
                querSnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push ({
                        id: doc.id,
                        heading,
                    })
                    
                });
                setTodos(todos)
            }
        )

    }, [])
 ////------delete a todo from firebase database=========//

    const deleteTodo = (todos) => {
        todoRef
            .doc(todos.id)
            .delete()
            .then(() => {
               //----- show a sucessful alert------//
               alert("Delete Sucessfully") 
            })
            .catch(error => {
                alert(error);
            })
    }

    // add a todo------------------//

    const addTodo = () =>{
        // check if we have a todo

        if (addData && addData.length > 0){
            // get the timestamp ------------------//
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createdAt: timestamp
            };
            todoRef
            .add(data)
            .then(() =>{
                SetAddData('');
                //release keyboard
                Keyboard.dismiss();
            })
            .catch((error) =>{
                alert(error);
            })

        }
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.formContainer}>
                <TextInput 
                style={styles.input}
                placeholder='Add A New Todo'
                placeholderTextColor='#aaaaaa'
                onChangeText={(heading) => setAddData(heading)}
                value={addData}
                underlineColorAndroid='transparent'
                autoCapitalize='none'

                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                <Text style={style.buttonText}>Add</Text>    
                </TouchableOpacity>

            </View>
            <FlatList 
            data={todos}
            numberColumns={1}
            renderItem={({item}) =>(
                <Viem>
                    <Pressable 
                      style={styles.container}
                      onPress={() => navigation.navigate('Detail', {item})}
                    >
                        <FontAwesome name='trash-o'
                        color='red'
                        onPress={() => deleteTodo(item)}
                        style={styles.todIcon}


                        />
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>

                                {item.heading[0].topperCase() + item.heading.slice(1)}
                            </Text>
                        </View>

                    </Pressable>
                </Viem>
            )}
            />

        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#e5e5e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10 ,
        flexDirection:'row' ,

        alignItems:'center'
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
        marginLeft:45,
    },
    itemHeading:{
        fontWeight:'bold',
        fontSize:18,
        marginRight:22,

    },
    formContainer:{
        flexDirection:'row',
        height:80,
        marginLeft10,
        marginRight:10,
        marginTop:100,
    },
    
     
})