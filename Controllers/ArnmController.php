<?php
namespace Arnm\CoreBundle\Controllers;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session;
use Doctrine\ORM\EntityManager;

/**
 * This class provides some overwrites to ease development with type hints
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
class ArnmController extends Controller
{
    /**
     * Gets session object
     *
     * @return Symfony\Component\HttpFoundation\Session
     */
    public function getSession()
    {
        return $this->get('session');
    }
    /**
     * Gets entity manager
     *
     * @return Doctrine\ORM\EntityManager
     */
    public function getEntityManager()
    {
        return $this->getDoctrine()->getEntityManager();
    }
}