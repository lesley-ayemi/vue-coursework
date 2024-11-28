<script setup>
import {ref, computed} from 'vue'
import lessons from './lessons';

const cart = ref([]);

const showCart = ref(false) // Controls whether to show the cart or lessons

const addToCart = (lessonId) => {
  const lesson = lessons.value.find(lesson => lesson.id === lessonId);

  // Check if there are available spaces
  if (lesson.spaces > 0) {
      // Reduce spaces by 1
      lesson.spaces--;

    // Add the lesson to the cart
    cart.value.push(lesson);
    // cart.value.push(lessonId);
  }
};

const deleteCartItem = (index) => {
  // Get the lesson being removed from the cart
  const lesson = cart.value[index];

  // Increase the available spaces for the lesson
  const originalLesson = lessons.value.find(l => l.id === lesson.id);
  if (originalLesson) {
    originalLesson.spaces++;
  }
  
  cart.value.splice(index, 1);

}

const cartCount = computed (() => cart.value.length);
// import HomePage from './components/HomePage.vue';

const toggleView = () => {
    showCart.value = !showCart.value // Toggle between lessons and cart view
}

const name = ref("")
const phoneNumber = ref("")
const nameError = ref("")
const phoneError = ref("")

// Form validation
const validateForm = (e) => {
  e.preventDefault() // Prevent form submission
  
    nameError.value = ""
    phoneError.value = ""
    
    // Check if name contains only letters (no numbers or special characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name.value)) {
        nameError.value = "Full Name must contain letters only";
        return
    }

    // Check if phone number contains only numbers
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(phoneNumber.value)) {
        phoneError.value = "Phone number must contain numbers only";
        return
    }
    
    
    completeCheckout();
  }

  // Complete Checkout
const completeCheckout = () => {
  alert("Order has been submitted");

  // Clear the cart
  cart.value = [];

  // Reset input fields
  name.value = "";
  phoneNumber.value = "";

  // Redirect back to the lessons view (assumes it's the homepage)
  showCart.value = false;
};

// Search Feature
const searchQuery = ref("");

// Computed property for filtering
const filteredLessons = computed(() => {
  return lessons.value.filter((lesson) => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return (
      lesson.subject.toLowerCase().includes(lowerCaseQuery) ||
      lesson.location.toLowerCase().includes(lowerCaseQuery) ||
      lesson.price.toString().includes(lowerCaseQuery) ||
      lesson.spaces.toString().includes(lowerCaseQuery)
    );
  });
});

// Determine which list to display
const displayedLessons = computed(() => {
  return searchQuery.value ? filteredLessons.value : sortedLessons.value;
});

// Sorting feature
const selectedAttribute = ref("");
const sortOrder = ref("asc");


const sortedLessons = computed(() => {
  return [...lessons.value].sort((a, b) => {
    if (!selectedAttribute.value) return 0;
    const modifier = sortOrder.value === "asc" ? 1 : -1;
    if (a[selectedAttribute.value] < b[selectedAttribute.value]) return -1 * modifier;
    if (a[selectedAttribute.value] > b[selectedAttribute.value]) return 1 * modifier;
    return 0;
  });
});


</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">TUTOR</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!-- <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li> -->
        
  
      </ul>
      <div class="d-flex">
        <button @click="toggleView" class="btn btn-success" :disabled="cartCount === 0">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="badge text-white">{{ cartCount }}</span>
          {{ showCart ? 'Back to Lessons' : 'Checkout' }}
        </button>
        <!-- <a href="" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i><span class="badge text-white">{{ cartCount }}</span>Checkout</a> -->
      </div>
    </div>
  </div>
</nav>

<main v-if="!showCart" role="main">

<section class="text-center container">
  <div class="row py-lg-5">
    <div class="col-lg-12 col-md-8 mx-auto">
      <h1 class="fw-light">Tutor Shop</h1>
      <p class="lead text-body-secondary">A web app that allows students and parents to buy after school activites</p>
      <!-- <p>
        <a href="#" class="btn btn-primary my-2">Main call to action</a>
        <a href="#" class="btn btn-secondary my-2">Secondary action</a>
      </p> -->
    </div>
  </div>
</section>
<div class="text-center mb-3 my-2========">
  <form action="">
    <input type="text" class="form-control mb-2" placeholder="Search Shop" v-model="searchQuery">
  </form>
  <div class="row">
    <div class="col-6">
      <select name="" v-model="selectedAttribute" class="form-control" id="">
        <option value="">Select Filter</option>
        <option value="subject">Subject</option>
        <option value="price">Price</option>
        <option value="location">Location</option>
        <option value="spaces">Spaces</option>
      </select>

    </div>
    <div class="col-6">
      <select name="" v-model="sortOrder" class="form-control" id="">
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>

  </div>
</div>


<div class="album py-5 bg-body-tertiary">
  <div class="container">

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      
      <div v-for="(lesson) in displayedLessons" :key="lesson.id" class="col">
        <div class="card shadow-sm">
          <img :src="lesson.subject_image" alt="Lesson Image" width="385" height="200">
          <!-- <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> -->
          <div class="card-body">
            <p class="card-text">Subject: {{ lesson.subject }}</p>
            <p class="card-text">Location: {{ lesson.location }}</p>
            <p class="card-text">Price: &#163;{{ lesson.price }}</p>
            <p class="card-text">Spaces: {{ lesson.spaces }}</p>
            <div class="">
              <div v-if="lesson.spaces >= 1" class="">
                <button type="button" v-on:click="addToCart(lesson.id)" class="btn col-12 btn-outline-primary">Add to cart</button>
              </div>
              <div v-else class="">
                <button type="button" class="btn col-12 btn-outline-secondary disabled">Add to cart</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

</main>

<div v-if="showCart" class="row py-5 g-5">
  <div class="col-md-5 col-lg-4 order-md-last">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-primary">Your cart</span>
      <span class="badge bg-primary rounded-pill">{{ cartCount }}</span>
    </h4>
    <ul class="list-group mb-3">
      <li v-for="product, index in cart" class="list-group-item d-flex justify-content-between lh-sm">
        <div>
          <h6 class="my-0">{{product.subject}}</h6>
          <span class="text-body-secondary">${{product.price}}</span>
          <!-- <small class="text-body-secondary">Brief description</small> -->
        </div>
        <button @click="deleteCartItem(index)" class="btn btn-sm btn-outline-danger">X</button>
      </li>
      <!-- <p class="text-danger">No items in cart</p> -->
      
      <!-- <li class="list-group-item d-flex justify-content-between">
        <span>Total (USD)</span>
        <strong>$20</strong>
      </li> -->
    </ul>
  </div>
  <div class="col-md-7 col-lg-8">
    <h4 class="mb-3">Billing address</h4>
    <form class="needs-validation" novalidate @submit="validateForm">
      <div class="row g-3">
        <!-- <div class="col-sm-6">
          <label for="firstName" class="form-label">First name</label>
          <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
          <div class="invalid-feedback">
            Valid first name is required.
          </div>
        </div>

        <div class="col-sm-6">
          <label for="lastName" class="form-label">Last name</label>
          <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
          <div class="invalid-feedback">
            Valid last name is required.
          </div>
        </div> -->

        <div class="col-12">
          <label for="full_name" class="form-label">Name</label>
          <div class="input-group has-validation">
            <!-- <span class="input-group-text">@</span> -->
            <input type="text" class="form-control" id="full_name" v-model="name" placeholder="Name" required="">
            <div v-if="nameError" class="text-danger col-12">{{ nameError }}</div>
          <!-- <div class="invalid-feedback">
              Your username is required. 
            </div> -->
          </div>
        </div>

        <div class="col-12">
          <label for="phone_number" class="form-label">Phone Number</label>
          <input type="text" class="form-control" id="phone_number" v-model="phoneNumber" placeholder="Phone Number">
          <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
          <!-- <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div> -->
        </div>

        
      </div>

      <hr class="my-4">

      <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
    </form>
  </div>
</div>

  

<footer class="text-body-secondary py-5">
  <div class="container">
    <p class="float-end mb-1">
      <a href="#">Back to top</a>
    </p>
    
    <p class="mb-0">Get the code <a href="https://github.com/lesley-ayemi/vue-coursework">Download my code</a> or read about my course <a href="https://www.mdx.ac.uk/courses/undergraduate/information-technology-bsc-honours/">getting started</a>.</p>
  </div>
</footer>


  
</template>

<style>
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }

    .b-example-divider {
    width: 100%;
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
    }

    .bi {
    vertical-align: -.125em;
    fill: currentColor;
    }

    .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
    }

    .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    }

    .btn-bd-primary {
    --bd-violet-bg: #712cf9;
    --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

    --bs-btn-font-weight: 600;
    --bs-btn-color: var(--bs-white);
    --bs-btn-bg: var(--bd-violet-bg);
    --bs-btn-border-color: var(--bd-violet-bg);
    --bs-btn-hover-color: var(--bs-white);
    --bs-btn-hover-bg: #6528e0;
    --bs-btn-hover-border-color: #6528e0;
    --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
    --bs-btn-active-color: var(--bs-btn-hover-color);
    --bs-btn-active-bg: #5a23c8;
    --bs-btn-active-border-color: #5a23c8;
    }

    .bd-mode-toggle {
    z-index: 1500;
    }

    .bd-mode-toggle .dropdown-menu .active .bi {
    display: block !important;
    }
</style>
