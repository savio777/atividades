<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Atividade extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
		header('Content-Type: application/json');
	}

	public function projeto($id)
	{
		if ($_SERVER['REQUEST_METHOD'] != 'GET') {
			echo 'bad requisition';
			return exit;
		}

		$data = array();
		$atividades = $this->doctrine->em->getRepository("Entity\Atividade")
			->findBy(array("idProjeto" => $id));
		$projeto = $this->doctrine->em->getRepository("Entity\Projeto")
			->findOneBy(array("id" => $id));

		foreach ($atividades as $ativadade) {
			array_push(
				$data,
				array(
					"id" => $ativadade->getId(),
					"dataCadastro" => $ativadade->getDataCadastro(),
					"descricao" => $ativadade->getDescricao(),
					"idProjeto" => $projeto->getId(),
					"descricaoProjeto" => $projeto->getDescricao()
				)
			);
		}
		echo json_encode($data);
	}

	public function get($id)
	{
		if ($_SERVER['REQUEST_METHOD'] != 'GET') {
			echo 'bad requisition';
			return exit;
		}

		$ativadade = $this->doctrine->em->getRepository("Entity\Atividade")
			->findOneBy(array("id" => $id));

//		return var_dump($ativadade);

		$data = array(
			"id" => $ativadade->getId(),
			"dataCadastro" => $ativadade->getDataCadastro(),
			"descricao" => $ativadade->getDescricao(),
			"idProjeto" => $ativadade->idProjeto->getId(),
			"descricaoProjeto" => $ativadade->idProjeto->getDescricao()
		);

		echo json_encode($data);
	}

	public function create()
	{
		if ($_SERVER['REQUEST_METHOD'] != 'POST') {
			echo 'bad requisition';
			return exit;
		}

		$data = json_decode($this->input->raw_input_stream, true);

		$projeto = $this->doctrine->em->getRepository("Entity\Projeto")
			->findBy(array("id" => $data['idProjeto']));

		$atividade = new Entity\Atividade;
		$atividade->setDescricao("Atividade " . $data['descricao']);
		$atividade->setIdProjeto($projeto[0]);
		$atividade->setDataCadastro(date("Y-m-d H:i:s"));
		//		$atividade->setDataCadastro($data['dataCadastro']);
		$this->doctrine->em->persist($atividade);
		$this->doctrine->em->flush();

		echo json_encode($atividade);
	}

	public function put()
	{
		if ($_SERVER['REQUEST_METHOD'] != 'PUT') {
			echo 'bad requisition';
			return exit;
		}

		$data = json_decode($this->input->raw_input_stream, true);

		$projeto = $this->doctrine->em->getRepository("Entity\Projeto")
			->findBy(array("id" => $data['idProjeto']));

		$atividade = new Entity\Atividade;
		$atividade->setId($data['id']);
		$atividade->setDescricao("Atividade " . $data['descricao']);
		$atividade->setIdProjeto($projeto[0]);
		$atividade->setDataCadastro(date("Y-m-d H:i:s"));
		//		$atividade->setDataCadastro($data['dataCadastro']);
		$this->doctrine->em->merge($atividade);
		$this->doctrine->em->flush();

		echo json_encode($atividade);
	}

	public function delete($id)
	{
		if ($_SERVER['REQUEST_METHOD'] != 'DELETE') {
			echo 'bad requisition';
			return exit;
		}

		$ativadade = $this->doctrine->em->getRepository("Entity\Atividade")
			->findOneBy(array("id" => $id));

		$this->doctrine->em->remove($ativadade);
		$this->doctrine->em->flush();

		echo json_encode($ativadade);
	}
}
