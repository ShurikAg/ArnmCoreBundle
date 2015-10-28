<?php
namespace Arnm\CoreBundle\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
/**
 * Controller that provides a baseline functionality for any ajax driven fuctionality
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
class ArnmAjaxController extends ArnmController
{
    /**
     * Extracts an array based on the json object in body
     *
     * @return array
     */
    protected function getArrayFromJsonContent(Request $request)
    {
        $content = $request->getContent();
        if (empty($content)) {
            throw new BadRequestHttpException("Empty payload!");
        }

        $data = json_decode($content, true);
        if (!is_array($data)) {
            throw new BadRequestHttpException("Payload is not parsable!");
        }

        return $data;
    }
    /**
     * Validates that we met all the restrictions related to this controller
     *
     * @throws NotFoundHttpException
     *
     * @codeCoverageIgnore
     */
    protected function validateRequest()
    {
        $request = $this->getRequest();
        if (! $request->isXmlHttpRequest()) {
            throw $this->createNotFoundException();
        }
    }

    /**
     * Creates generic response object that this controller typically sends back
     *
     * @param array $data
     *
     * @return Response
     *
     * @codeCoverageIgnore
     */
    protected function createResponse(array $data = array())
    {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }
}
