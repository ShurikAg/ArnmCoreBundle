<?php
namespace Arnm\CoreBundle\Bundle;

/**
 * This interface defines bundke configuration class that bundles will push into collector when registering.
 *
 * @author Alex Agulyansky <alex@iibspro.com>
 */
interface BundleInfoInterface
{
    
    /**
     * Gets a unique key for this bundle to identified by
     *
     * @return string
     */
    public function getKey();
}
