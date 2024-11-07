import {ref} from 'vue'
import mathImage from '@/assets/images/maths.jpg'
import englishImage from '@/assets/images/english.jpg'
import musicImage from '@/assets/images/music.jpg'
import phpImage from '@/assets/images/php.png'
import javascriptImage from '@/assets/images/javascript.png'
import nodeImage from '@/assets/images/node.png'
import htmlImage from '@/assets/images/html.png'
import rubyImage from '@/assets/images/ruby.png'
import pythonImage from '@/assets/images/python.png'
import cyberImage from '@/assets/images/cyber.png'

const lessons = ref([
    {
    id: 1,
    subject: 'Maths',
    location: 'London',
    price: '300',
    spaces: '0',
    subject_image: mathImage,
    },
    {
    id: 2,
    subject: 'English',
    location: 'London',
    price: '200',
    spaces: '5',
    subject_image: englishImage,
    },
    {
    id: 3,
    subject: 'Music',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: musicImage,
    },
    {
    id: 4,
    subject: 'PHP',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: phpImage,
    },
    {
    id: 5,
    subject: 'Javascript',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: javascriptImage,
    },
    {
    id: 6,
    subject: 'Node JS',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: nodeImage,
    },
    {
    id: 7,
    subject: 'Cyber security',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: cyberImage,
    },
    {
    id: 8,
    subject: 'Python',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: pythonImage,
    },
    {
    id: 9,
    subject: 'Html',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: htmlImage,
    },
    {
    id: 10,
    subject: 'Ruby',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: rubyImage,
    },

])
export default lessons;