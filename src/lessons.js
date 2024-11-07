import {ref} from 'vue'
import mathImage from '@/assets/images/maths.jpg'
import englishImage from '@/assets/images/english.jpg'
import musicImage from '@/assets/images/music.jpg'

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
    subject: 'Arts',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: 'k',
    },
    {
    id: 5,
    subject: 'Programming',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },
    {
    id: 6,
    subject: 'Cyber security',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },
    {
    id: 7,
    subject: 'PHP',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },
    {
    id: 8,
    subject: 'DJango',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },
    {
    id: 9,
    subject: 'NODE Js',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },
    {
    id: 10,
    subject: 'Ruby',
    location: 'London',
    price: '150',
    spaces: '5',
    subject_image: '',
    },

])
export default lessons;