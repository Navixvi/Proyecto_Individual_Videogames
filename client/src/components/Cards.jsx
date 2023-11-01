import Card from '../components/Card';

const Cards = ({ characters, onClose }) => {
   return(
      <div>
         {characters.map(({ id, name, image, plataform, releaseDate, rating }) => {
            return <Card
               key={id}
               id={id}
               name={name}
               image={image}
               onClose={onClose}
               plataform={plataform}
               releaseDate={releaseDate}
               rating={rating}
            />;
         })}
      </div>
   )
}

export default Cards;