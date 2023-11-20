// Destructuration of the Vue object
const { createApp } = Vue;

// Object DateTime
let dt = luxon.DateTime;

// Contacts array
contacts = [
    {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ]
    },
    {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ]
    },
    {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ]
    },
    {
        name: 'Alessandro B.',
        avatar: '_4',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ]
    },
    {
        name: 'Alessandro L.',
        avatar: '_5',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ]
    },
    {
        name: 'Claudia',
        avatar: '_6',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ]
    },
    {
        name: 'Federico',
        avatar: '_7',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ]
    },
    {
        name: 'Davide',
        avatar: '_8',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ]
    }
]

// app is the object createApp took from the Vue object 
const app = createApp({
 
    data() {
        //return contains the variables
        return {
            contacts: contacts,
            activeIndex: 0,
            myMsg: "",
            inputSearch: "",
            indexMsg: 0
        }
    },
    //methods contains the functions
    methods: {
        //At the click in one contact it take the index of the contact clicked and change the value of the activeIndex
        chat(i) {
            this.activeIndex = i;
        },
        //This function adds an object to the array contact at the index activeIndex at the last position of the message array. The object created is formed by the date, the message writed in the input element and the status 'send'. At the end clears the input text and after a second invokes the answer() function. This function is activated at the click of the enter key. The message is send when ihe input text is not void
        sendMessage() {
            this.indexMsg = this.activeIndex;
            if (this.myMsg !== "") {
                this.contacts[this.indexMsg].messages.push({
                    date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                    message: this.myMsg,
                    status: "sent"
                });
                this.myMsg = "";
                setTimeout(this.answer, 1000);
            }

        },
        //This function is activated a second after the sendMessage() function. It creates an object similar to the object created by the sendMessage() function, the only things that change are: the message string is always equal to "Ok!" and the status is always equal to "received"
        answer() {
            this.contacts[this.indexMsg].messages.push({
                date: dt.now().setLocale('it').toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS),
                message: "Ok!",
                status: "received"
            })
        },
        //This function set to lower case the input writed in the search input text, and compare it with each name in the contacts array setted to lower case also that, if the name doesen't contains the searchContact string the key visible is changed to false. This function is activated at every key click
        search() {
            let searchContact = this.inputSearch.toLowerCase().trim();
            this.contacts.forEach(contact => {
                contact.visible = true;
                if (!contact.name.toLowerCase().includes(searchContact)) {
                    contact.visible = false;
                }
            });
        },
        // This function delete an element in the messages array at the index i passed as a parameter
        deleteMsg(i) {
            if (i === 0) {
                this.contacts[this.activeIndex].messages.pop();
            }else{
                this.contacts[this.activeIndex].messages.splice(i, 1);
            }
            
        },
        //It takes the string myDate, splites it in two parts and saves in the variable myTime the firsts 5 characters of the second element es. myDate = 12/03/2023 12:09:55 -> [12/03/2023] [12:09:55] -> 12:09
        formatDate(myDate) {
            let myTime = myDate.split(" ")[1].slice(0, 5);
            return myTime;
        }
    }

}).mount("#app");//connects the "app" object created with Vue to the HTML element detected by the id "app"