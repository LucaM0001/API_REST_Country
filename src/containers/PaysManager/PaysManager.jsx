import React, { useState, useEffect } from "react"
import Titre from "../../components/TitreH1"
import Bouton from "../../components/Bouton/Bouton"
import axios from "axios"
import Pays from "./Pays/Pays"

const PaysManager = () => {
  const [listePays, setListePays] = useState([])
  const [loading, setLoading] = useState(false)
  const [regionSelection, setRegionSelection] = useState(null)
  const [numeroPageActuel, setNumeroPageActuel] = useState(1)

  useEffect(() => {
    handleSelectionPaysParRegion("all")
  }, [])

  const handleSelectionPaysParRegion = (region) => {
    let param = region === "all" ? region : `region/${region}`
    setLoading(true)

    axios
      .get(`https://restcountries.com/v3.1/${param}`)
      .then((response) => {
        const formattedPays = response.data.map((pays) => ({
          nom: pays.name.common,
          nomFrancais: pays.translations.fra.common,
          capitale: pays.capital,
          region: pays.region,
          drapeau: pays.flags.svg,
        }))

        setListePays(formattedPays)
        setRegionSelection(region)
        setNumeroPageActuel(1)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)
      })
  }

  const handlePageChange = (pageNumber) => {
    setNumeroPageActuel(pageNumber)
  }

  const pagination = () => {
    const totalPages = Math.ceil(listePays.length / 10)
    return [...Array(totalPages)].map((_, i) => (
      <Bouton
        key={i + 1}
        typeBtn="btn-info"
        estSelection={numeroPageActuel === i + 1}
        clic={() => handlePageChange(i + 1)}
      >
        {i + 1}
      </Bouton>
    ))
  }

  const listReduite = listePays.slice(
    (numeroPageActuel - 1) * 10,
    numeroPageActuel * 10
  )
  const listPaysComponents = listReduite.map((pays) => (
    <div className="col-12 col-md-6" key={pays.nom}>
      <Pays {...pays} />
    </div>
  ))

  return (
    <div className="container">
      <Titre>Liste des pays du monde</Titre>
      <div className="btn-group" role="group" aria-label="Region selection">
        {["all", "Europe", "Africa", "Asia", "Americas", "Oceania"].map(
          (region) => (
            <Bouton
              key={region}
              estSelection={regionSelection === region}
              typeBtn="btn-info"
              clic={() => handleSelectionPaysParRegion(region)}
            >
              {region === "all" ? "Tous" : region}
            </Bouton>
          )
        )}
      </div>

      <div className="my-3">
        Nombre de pays :{" "}
        <span className="badge bg-success">{listePays.length}</span>
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <>
          <div className="row no-gutters">{listPaysComponents}</div>
          <div className="mt-3 d-flex justify-content-center">
            {pagination()}
          </div>
        </>
      )}
    </div>
  )
}

export default PaysManager
