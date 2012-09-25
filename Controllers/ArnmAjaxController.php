<?php
namespace Arnm\CoreBundle\Controllers;

use Arnm\CoreBundle\Controllers\ArnmController;
use Symfony\Component\HttpFoundation\Response;
/**
 * Controller that provides a baseline functionality for any ajax driven fuctionality
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
class ArnmAjaxController extends ArnmController
{
  /**
   * Validates that we met all the restrictions related to this controller
   * 
   * @throws NotFoundHttpException
   */
  protected function validateRequest()
  {
    $request = $this->getRequest();
    if(! $request->isXmlHttpRequest()) {
      throw $this->createNotFoundException();
    }
  }
  
  /**
   * Creates generic response object that this controller typically sends back
   * 
   * @param array $data
   * 
   * @return Response
   */
  protected function createResponse(array $data = array())
  {
    $response = new Response(json_encode($data));
    $response->headers->set('Content-Type', 'application/json');
    
    return $response;
  }
}

?>