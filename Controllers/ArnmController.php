<?php
namespace Arnm\CoreBundle\Controllers;

//use Arnm\MenuBundle\Manager\MenuManager;
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
     * Gets pages manager instance
     *
     * @return Arnm\PagesBundle\Manager\PagesManager
     */
    protected function getPagesManager()
    {
        return $this->get('arnm_pages.manager');
    }
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
    /**
     * Gets MenuManger form the container
     *
     * @return Arnm\MenuBundle\Manager\MenuManager
     */
    protected function getMenuManager()
    {
        return $this->get('arnm_menu.manager');
    }
}