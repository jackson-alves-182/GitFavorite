import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();

  }

  async add(username){
    try{

      const userExists = this.entries.find(entry => entry.login === username)

      if(userExists){
        throw new Error("Usuário já cadastrado !!");
      }
      const user = await GithubUser.search(username);

      if(user.login === undefined){
        throw new Error ("Usuário não existe !!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    }
    catch(error){
      alert(error.message);
    }
  } 

  load() {
    this.entries = JSON.parse(localStorage.getItem
      ('@github-favorites')) || [];
  }

  save() {
    localStorage.setItem('@github-favorites', JSON.stringify(this.entries));
  }

  delete(user){

    const filteredUsers = this.entries.filter( entry =>
      entry.login !== user.login )

    this.entries = filteredUsers;

    this.update();
    this.save();
  }
}

export class FavoritesView extends Favorites {
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');
  
    this.update();
    this.addNewUser();

  }


  addNewUser(){
    const addButton = this.root.querySelector('#button-search');
    addButton.onclick = () => {
      const { value } = document.querySelector('#input-search');
      
      this.add(value);
    }
  }

  update(){
    this.removeAllTr();

    this.entries.forEach( user => {
      const row = this.createRow();

      row.querySelector('.user a').href = `https://github.com/${user.login}`;
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = user.login;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;
      
      row.querySelector('#delete-btn').onclick = () => {
        this.delete(user);
      }

      this.tbody.append(row);
    })

  }

  createRow() {
    const tr = document.createElement('tr');

    tr.innerHTML = `      
    <td class="user">
        <a href="">
          <img src="">
          <div>
            <p></p>
            <span></span>
          </div>
        </a>
      </td>

      <td class="repositories"></td>
      <td class="followers"></td>
      <td>
        <button id="delete-btn">Remover</button>
    </td>
     `
      return tr;
  }

  removeAllTr(){
    this.tbody.querySelectorAll('tr').forEach((tr) => tr.remove());
  }
}