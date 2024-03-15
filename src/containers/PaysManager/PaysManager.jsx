import { Component } from "react";
import Titre from "../../components/TitreH1";
import Bouton from "../../components/Bouton/Bouton";
import axios from "axios";
import Pays from "./Pays/Pays";

class PaysManager extends Component {
  state = {
    listePays: [],
    loading: false,
    regionSelection: null,
    numeroPageActuel: 1,
  };

  componentDidMount = () => {
    this.handleSelectionPaysParRegion("all");
  };

  handleSelectionPaysParRegion = (region) => {
    let param = "";
    if (region === "all") param = region;
    else param = `region/${region}`;

    this.setState({ loading: true });
    axios
      .get(`https://restcountries.com/v3.1/${param}`)
      .then((response) => {
        const listePays = response.data.map((pays) => {
          return {
            nom: pays.name.common,
            nomFrancais: pays.translations.fra.common,
            capitale: pays.capital,
            region: pays.region,
            drapeau: pays.flags.svg,
          };
        });

        this.setState({
          listePays,
          loading: false,
          regionSelection: region,
          numeroPageActuel: 1,
        });
      })
      .catch((error) => {
        this.setState({ loading: true });
        console.log(error);
      });
  };

  render() {
    let pagination = [];
    let listePays = "";

    if (this.state.listePays) {
      let fin = this.state.listePays.length / 10;
      if (this.state.listePays.length % 10 !== 0) fin += 1;
      for (let i = 1; i <= fin; i++) {
        pagination.push(
          <Bouton
            key={i}
            typeBtn="btn-info"
            estSelection={this.state.numeroPageActuel === i}
            clic={() => this.setState({ numeroPageActuel: i })}
          >
            {i}
          </Bouton>
        );
      }

      const debut = (this.state.numeroPageActuel - 1) * 10;
      const finListe = this.state.numeroPageActuel * 10;
      const listReduite = this.state.listePays.slice(debut, finListe);
      listePays = listReduite.map((pays) => {
        return (
          <div className="col-12 col-md-6" key={pays.nom}>
            <Pays {...pays} />
          </div>
        );
      });
    }
    return (
      <div className="container">
        <Titre>Liste des pays du monde</Titre>
        <Bouton
          estSelection={this.state.regionSelection === "all"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("all")}
        >
          Tous
        </Bouton>
        <Bouton
          estSelection={this.state.regionSelection === "Europe"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("Europe")}
        >
          Europe
        </Bouton>
        <Bouton
          estSelection={this.state.regionSelection === "Africa"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("Africa")}
        >
          Afrique
        </Bouton>
        <Bouton
          estSelection={this.state.regionSelection === "Asia"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("Asia")}
        >
          Asie
        </Bouton>
        <Bouton
          estSelection={this.state.regionSelection === "Americas"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("Americas")}
        >
          Amérique
        </Bouton>
        <Bouton
          estSelection={this.state.regionSelection === "Oceania"}
          typeBtn="btn-info"
          clic={() => this.handleSelectionPaysParRegion("Oceania")}
        >
          Océanie
        </Bouton>
        Nombre de pays :{" "}
        <span className="badge bg-success">{this.state.listePays.length}</span>
        {this.state.loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="row no-gutters">{listePays}</div>
        )}
        <div>{pagination}</div>
      </div>
    );
  }
}

export default PaysManager;
