<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Projeto extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        header('Content-Type: application/json');
    }

    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'GET') {
            echo 'bad requisition';
            return exit;
        }

        $projeto = $this->doctrine->em->getRepository("Entity\Projeto")->findAll();

        echo json_encode($projeto);
    }
}
