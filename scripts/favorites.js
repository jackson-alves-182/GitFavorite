import { GithubUser } from "./GithubUser.js"

export class Favorites {
  constructor(root){
    this.root = document.querySelector(root);
    this.load();
  }


load() {
  this.entries = [
    {
      login:'maykbrito',
      name:"Mayk Britto",
      public_repost:'80',
      followers:'14000'
  
    },
    {
      login:'jackson-alves-182',
      name:"Jackson Alves",
      public_repost:'29',
      followers:'9'
    }]
  }
}

export class FavoritesView extends Favorites {
  constructor(root){
    super(root);

    this.tbody = this.root.querySelector('table tbody');
  
    this.update();
  }

  update(){

    this.entries.forEach( user => {
      const row = this.createRow();

      row.querySelector('.user a').href = `https://github.com/${user.login}`;
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user p').textContent = user.name;
      row.querySelector('.user span').textContent = user.login;
      row.querySelector('.repositories').textContent = user.public_repost;
      row.querySelector('.followers').textContent = user.followers;

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

}