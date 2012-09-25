<?php
/*
 * This file is part of the Araneum package.
 *
 * (c) Alex Agulyansky <alex@iibspro.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
//TODO: Add proper license info
namespace Arnm\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * This controller is the main entry point to araneum (admin)
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
class DashboardController extends Controller
{
    /**
     * The main dashboard action
     */
    public function indexAction()
    {
        return $this->render('ArnmCoreBundle:Dashboard:index.html.twig');
    }
}