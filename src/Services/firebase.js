// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, setDoc, deleteField } from 'firebase/firestore/lite';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCBIYBcLAaNQoKrfU_5nTgt1VDJ7dwJwZs",
    authDomain: "sds-project-group.firebaseapp.com",
    projectId: "sds-project-group",
    storageBucket: "sds-project-group.appspot.com",
    messagingSenderId: "936957206774",
    appId: "1:936957206774:web:c074772e561d5c13560cd7",
    measurementId: "G-6B4M32W31K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
const noUserError = 'No user Logged in';
const htmlColName = 'html';
const userColName = 'users';
let pageName = '';
// const missingPermissionError = 'Operation not Allowed/ Missing Permissions';

// GetObj
// Required User to be logged in
// returns all the html files and sections 
// associated to the logged in user 

const getObj = async () => {
    let finalObj = {};
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        const userid = getUid();
        const htmlData = collection(db, htmlColName);
        const htmlSnapshot = await getDocs(htmlData);
        await htmlSnapshot.docs.map(ht => {
            if (ht.data().uid === userid) {
                let id = ht.id;
                finalObj[id] = ht.data();
            }
            return true;
        })
        let ob = {};
        Object.keys(finalObj).map(ar => {
            if (ob[finalObj[ar].pageID]) {
                let temp = ob[finalObj[ar].pageID];
                temp[ar] = finalObj[ar];
                ob[finalObj[ar].pageID] = temp;
            }
            else {
                ob[finalObj[ar].pageID] = { [ar]: finalObj[ar] };
            }
            return true;
        });
        return ob;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// logIn
// params 
// email: users registered email
// pass: users registered pass
// logs the user in using firebase auth
// handles the auth var


const logIn = async (email, pass) => {
    try {
        const token = await signInWithEmailAndPassword(auth, email, pass);
        if (token)
            return token
    } catch (err) {
        return err.message;
    }
};

// register
// params
// name: users name
// email: users registered email
// pass: users registered pass
// registers the user using firebase and auto logs them in

const register = async (name, email, password) => {
    try {
        console.log(email, password);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, userColName), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return res;
    } catch (err) {
        return err.message;
    }
};

// logout
// logs the user out

const logout = () => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        signOut(auth);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//updateSection
//params
//updateData: whole section object
//id: section Id
//updates the corresponding section with the data provided

const updateSection = async (updateData, id = 'K44OqzCxISxCCqES7qHL',) => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        // if(!checkIfOpIsAllowed(id))
        //     throw new Error(missingPermissionError);
        await setDoc(doc(db, htmlColName, id), updateData);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// updateComponent
// params
// type: the type of component (eg Image, TextBox)
// updateId: Component ID
// id: sectionId/ NanoId
// updateData: updated data
// updates the section with corresponding component

const updateComponent = async (type, updateId, updateData, id = 'K44OqzCxISxCCqES7qHL',) => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        // if(!checkIfOpIsAllowed(id))
        //     throw new Error(missingPermissionError);
        let obj = await collection(db, htmlColName);
        let objdata = await getDocs(obj);
        let currentSec = {};
        objdata.docs.map(ob => {
            if (ob.id === id) {
                currentSec = ob.data();
            }
            return true;
        })
        let tempObj = currentSec[type];
        tempObj[updateId] = updateData;
        await updateDoc(doc(db, htmlColName, id), {
            [type]: tempObj,
        })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// removeSection
// params
// id: sectionId
// removes the section with the corresponding section id 

const removeSection = async (id) => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        // if(!checkIfOpIsAllowed(id))
        //     throw new Error(missingPermissionError);

        await deleteDoc(doc(db, htmlColName, id));
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// removeComponent
// params
// id: sectionId
// type: type of component
// removes the component with the corresponding type and component id 

const removeComponent = async (type, id = 'K44OqzCxISxCCqES7qHL') => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        // if(!checkIfOpIsAllowed(id))
        //     throw new Error(missingPermissionError);

        await updateDoc(doc(db, htmlColName, id), {
            [type]: deleteField()
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

// addSection
// params
// basicData: basic Html based on template
// pageID: the page the section belongs to
// id: the id of the section
// adds a new doc/ section

const addSection = async (basicData, id, pageId) => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        const userid = getUid();
        // const docID = await addDoc(collection(db, htmlColName,id), {
        //     uid: userid
        // });
        console.log('hello');
        basicData['uid'] = userid;
        basicData['pageID'] = pageId;
        basicData['pageName'] = pageName;
        await setDoc(doc(db, htmlColName, id), basicData);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}


// getUid 
// returns the userId

const getUid = () => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        return auth.currentUser.uid;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

//removeComponentById
//params:
//type: the type of component
//param_id:component Id
//id : section Id
//removes specific component

const removeComponentById = async (type, param_id, id = 'K44OqzCxISxCCqES7qHL') => {
    try {
        if (!auth.currentUser)
            throw new Error(noUserError);
        // if(!checkIfOpIsAllowed(id))
        //     throw new Error(missingPermissionError);

        await updateDoc(doc(db, htmlColName, id), {
            [`${type}.${param_id}`]: deleteField()
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

//uploadImage
//param
//name: filename in cloud
//img: image to be uploaded
//filetype: whats the filetype
//uploads the image to firebase server

const uploadImage = async (name, img, filetype) => {
    try {
        const userId = getUid();
        const imgRef = ref(storage, `images/${userId}/${name}`);
        const metadata = {
            contentType: `image/${filetype}`
        }
        await uploadBytesResumable(imgRef, img, metadata);
        let url = `https://firebasestorage.googleapis.com/v0/b/sds-project-group.appspot.com/o/images%2F${userId}%2F${name}?alt=media`
        return url;

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

//getName
//return the logged in user name

const getName = async () => {
    const userid = getUid();
    const userData = collection(db, userColName);
    const userSnapshot = await getDocs(userData);
    const name = userSnapshot.docs.map(ht => {
        if (ht.data().uid === userid) {
            return ht.data().name;
        }
        return true
    })
    return name;
}

const setPageName = (name) => {
    pageName = name;
}
// checkIfOpIsAllowed
// params
// id: sectionId/ NanoId
// returns true or false based on userId 
// and if that user id is allowed to make the said operation

// const checkIfOpIsAllowed = async(id) =>{
//     try{
//         if(!auth.currentUser)
//             throw new Error(noUserError);
//         const userid = getUid();
//         if(await doc(db, htmlColName, id).data().uid === userid)
//             return true;
//         return false; 
//     } catch(err){
//         console.error(err);
//         alert(err.message);
//     }
// };  


export { getObj, removeComponent, db, initializeApp, firebaseConfig, register, logIn, logout, updateComponent, removeComponentById, getUid, addSection, removeSection, uploadImage, getName, updateSection, setPageName }; 
