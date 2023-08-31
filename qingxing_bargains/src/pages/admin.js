import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      title: '',
      description: '',
      default_element: '',
      element_options: [],
      rarity: 1,
      region: '',
      specialty_dish: '',
      elemental_skill: '',
      elemental_burst: '',
      character_card_img: null,
      character_model_img: null,
      character_icon_img: null,
      character_dish_img: null,
      character_normal_attack_img: null,
      character_elemental_skill_img: null,
      character_elemental_burst_img: null,
      character_element_img: null,
      price: 0,
      stock: 0,
      apiCharacters: [],
      selected: null,
      _id: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_icon_img: file });
  };

  handleElementChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRarityChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRegionChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSpecialtyDishChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleNormalAttackChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleElementalSkillChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleElementalBurstChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handlePriceChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleStockChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleCharacterCardImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_card_img: file });
  };

  handleCharacterModelImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_model_img: file });
  };

  handleCharacterDishImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_dish_img: file });
  };

  handleCharacterNormalAttackImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_normal_attack_img: file });
  };

  handleCharacterElementalSkillImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_elemental_skill_img: file });
  };

  handleCharacterElementalBurstImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_elemental_burst_img: file });
  };

  handleCharacterElementImgChange = (event) => {
    const file = event.target.files[0];
    this.setState({ character_element_img: file });
  };


  handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data, including the image
    const formData = new FormData();
    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }

    // Send the formData to your server using a POST request
    axios.post('http://localhost:5000/api/characterImage/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  handleUpdateSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the form data, including the image
    const formData = new FormData();
    for (const key in this.state) {
      formData.append(key, this.state[key]);
    }

    // Send the formData to your server using a PUT request to update the character
    axios.put(`http://localhost:5000/api/characterImage/${this.state.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log(response.data);
        // Handle the response from the server as needed
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  componentDidMount() {
    // Fetch characters data from API
    axios.get('http://localhost:5000/api/characters/')
      .then((response) => {
        console.log(response);
        this.setState({ apiCharacters: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    // Fetch characters data from API
    axios.get('http://localhost:5000/api/characters/')
      .then((response) => {
        console.log(response);
        this.setState({ apiCharacters: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Perform the update logic using this.state._id and other form fields
  };


  render() {
    const { apiCharacters, selected } = this.state;



    return (
      <div className="container_p">
        <div className="card_i">
          <div className="title_i">Inventory Management</div>
          <div className='content_i'>
            <div className='update_a'>
              <div className='dropdown_box'>
                <select className="dropdown" onChange={(e) => {
                  const selectedCharacter = apiCharacters.find((character) => character.name === e.target.value);
                  console.log(selectedCharacter);
                  console.log(e.target.value);
                  this.setState({ selected: selectedCharacter, _id: selectedCharacter._id });
                }} defaultValue="default">
                  <option value="default" className="dropdown-content">Choose an option</option>
                  {apiCharacters.map((character) => (
                    <option className="dropdown-content" key={character._id} value={character.name} style={{ marginLeft: 200 }}>{character.name}</option>
                  ))}
                </select>

                {selected ? (
                  <div className="holder">
                    <img className="image" src={`http://localhost:5000/${selected.character_model_img}`} alt={selected.name} />
                    <div className="overlay_admin">
                      <div className="content">

                        <div className="character-title">{selected.title}</div>
                        <div className="character-name">{selected.name}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className='update_admin'>
                <h2>Update a Character</h2>
                <form onSubmit={this.handleUpdateSubmit} encType="multipart/form-data">
                  <div>
                    <label>ID:</label>
                    <input
                      type="text"
                      name="_id"
                      value={this.state._id}
                      onChange={this.handleInputChange}
                      disabled // Disable editing of _id
                    />
                  </div>
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Character Card Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_card_img"
                      onChange={this.handleCharacterCardImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Model Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_model_img"
                      onChange={this.handleCharacterModelImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Dish Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_dish_img"
                      onChange={this.handleCharacterDishImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Normal Attack Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_normal_attack_img"
                      onChange={this.handleCharacterNormalAttackImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Elemental Skill Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_elemental_skill_img"
                      onChange={this.handleCharacterElementalSkillImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Elemental Burst Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_elemental_burst_img"
                      onChange={this.handleCharacterElementalBurstImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Element Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_element_img"
                      onChange={this.handleCharacterElementImgChange}
                    />
                  </div>

                  <div>
                    <label>Character Icon Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_icon_img"
                      onChange={this.handleImageChange}
                    />
                  </div>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Default Element:</label>
                    <input
                      type="text"
                      name="default_element"
                      value={this.state.default_element}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Rarity:</label>
                    <input
                      type="number"
                      name="rarity"
                      value={this.state.rarity}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Region:</label>
                    <input
                      type="text"
                      name="region"
                      value={this.state.region}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Specialty Dish:</label>
                    <input
                      type="text"
                      name="specialty_dish"
                      value={this.state.specialty_dish}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Normal Attack:</label>
                    <input
                      type="text"
                      name="normal_attack"
                      value={this.state.normal_attack}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Elemental Skill:</label>
                    <input
                      type="text"
                      name="elemental_skill"
                      value={this.state.elemental_skill}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Elemental Burst:</label>
                    <input
                      type="text"
                      name="elemental_burst"
                      value={this.state.elemental_burst}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleInputChange}
                    />

                  </div>
                  <button className="submit_create_a" type="submit">Submit</button>
                </form>
              </div>
            </div>
            <div className='create_a'>
              <div className='create_admin'>
                <h2>Create a New Character</h2>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <div>
                    <label>Character Card Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_card_img"
                      onChange={this.handleCharacterCardImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Model Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_model_img"
                      onChange={this.handleCharacterModelImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Dish Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_dish_img"
                      onChange={this.handleCharacterDishImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Normal Attack Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_normal_attack_img"
                      onChange={this.handleCharacterNormalAttackImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Elemental Skill Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_elemental_skill_img"
                      onChange={this.handleCharacterElementalSkillImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Elemental Burst Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_elemental_burst_img"
                      onChange={this.handleCharacterElementalBurstImgChange}
                    />
                  </div>
                  <div>
                    <label>Character Element Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_element_img"
                      onChange={this.handleCharacterElementImgChange}
                    />
                  </div>

                  <div>
                    <label>Character Icon Image:</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="character_icon_img"
                      onChange={this.handleImageChange}
                    />
                  </div>
                  <div>
                    <label>Title:</label>
                    <input
                      type="text"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Default Element:</label>
                    <input
                      type="text"
                      name="default_element"
                      value={this.state.default_element}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Rarity:</label>
                    <input
                      type="number"
                      name="rarity"
                      value={this.state.rarity}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Region:</label>
                    <input
                      type="text"
                      name="region"
                      value={this.state.region}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Specialty Dish:</label>
                    <input
                      type="text"
                      name="specialty_dish"
                      value={this.state.specialty_dish}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Normal Attack:</label>
                    <input
                      type="text"
                      name="normal_attack"
                      value={this.state.normal_attack}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Elemental Skill:</label>
                    <input
                      type="text"
                      name="elemental_skill"
                      value={this.state.elemental_skill}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Elemental Burst:</label>
                    <input
                      type="text"
                      name="elemental_burst"
                      value={this.state.elemental_burst}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      value={this.state.stock}
                      onChange={this.handleInputChange}
                    />

                  </div>
                  <button className="submit_create_a" type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

    );
  }
}

export default Admin;
